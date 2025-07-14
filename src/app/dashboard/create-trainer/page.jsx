'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CreateTrainer() {

  const [experience, setExperience] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [teachingMode, setTeachingMode] = useState('');
  const [status, setStatus] = useState('');
  const [certificates, setCertificates] = useState([{ name: '', file: null }]);
  const [documents, setDocuments] = useState([{ name: '', file: null }]);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    pincode: '',
    country: 'India',
    state: '',
    district: '',
    city: '',
    languages: '',
    designation: '',
    skills: '',
    prevCompany: '',
    degree: '',
    course: '',
    courseTaught: '',
    expectedSalary: '',
    bio: '',
    aadhaar: '',
    pan: '',
    aadhaarFile: null,
    panFile: null,
    resumeFile: null,
    tenthCertFile: null
  });

 
  const [locationData, setLocationData] = useState({
    city: '',
    state: '',
    district: ''
  });
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const masterCourses = ['Full Stack Development', 'Data Science', 'UI/UX Design'];


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };


  useEffect(() => {
    const fetchLocation = async () => {
      if (formValues.pincode.length === 6) {
        setIsFetchingLocation(true);
        try {
          const apiKey = process.env.NEXT_PUBLIC_ZIPCODEBASE_API_KEY || 'YOUR_API_KEY';
          const response = await axios.get(
            `https://app.zipcodebase.com/api/v1/search?apikey=${apiKey}&codes=${formValues.pincode}&country=in`
          );
          
          const results = response.data.results[formValues.pincode];
          if (results && results.length > 0) {
            const location = results[0];
            setLocationData({
              city: location.city || '',
              state: location.state || '',
              district: location.province || location.city || ''
            });
          }
        } catch (error) {
          console.error('Error fetching location:', error);
        } finally {
          setIsFetchingLocation(false);
        }
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchLocation();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [formValues.pincode]);

  useEffect(() => {
    setFormValues(prev => ({
      ...prev,
      city: locationData.city,
      state: locationData.state,
      district: locationData.district
    }));
  }, [locationData]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e, index, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await convertToBase64(file);
      
      if (type === 'certificate') {
        const updated = [...certificates];
        updated[index] = { ...updated[index], file: base64 };
        setCertificates(updated);
      } else if (type === 'document') {
        const updated = [...documents];
        updated[index] = { ...updated[index], file: base64 };
        setDocuments(updated);
      } else {
        setFormValues(prev => ({ ...prev, [e.target.name]: base64 }));
      }
    } catch (error) {
      console.error('Error converting file:', error);
      alert('Error processing file. Please try again.');
    }
  };

 
  const addCertificate = () => setCertificates([...certificates, { name: '', file: null }]);
  const removeCertificate = (index) => {
    const updated = [...certificates];
    updated.splice(index, 1);
    setCertificates(updated);
  };

  const addDocument = () => setDocuments([...documents, { name: '', file: null }]);
  const removeDocument = (index) => {
    const updated = [...documents];
    updated.splice(index, 1);
    setDocuments(updated);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...formValues,
        experience,
        experienceLevel,
        teachingMode,
        status,
        certificates: certificates.filter(cert => cert.name && cert.file),
        documents: documents.filter(doc => doc.name && doc.file)
      };

      const res = await axios.post('/api/create-trainer', payload);
      alert('Trainer created successfully!');
      resetForm();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create trainer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const resetForm = () => {
    setFormValues({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      pincode: '',
      country: 'India',
      state: '',
      district: '',
      city: '',
      languages: '',
      designation: '',
      skills: '',
      prevCompany: '',
      degree: '',
      course: '',
      courseTaught: '',
      expectedSalary: '',
      bio: '',
      aadhaar: '',
      pan: '',
      aadhaarFile: null,
      panFile: null,
      resumeFile: null,
      tenthCertFile: null
    });
    setExperience('');
    setExperienceLevel('');
    setTeachingMode('');
    setStatus('');
    setCertificates([{ name: '', file: null }]);
    setDocuments([{ name: '', file: null }]);
    setLocationData({ city: '', state: '', district: '' });
  };

  return (
    <div className="min-h-screen  p-3 md:p-2">
      <h1 className="text-sm font-bold text-purple-800 mt-2 text-start">Create Trainer</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="ext-sm font-semibold text-gray-800 mb-4">1. Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
              <input
                name="firstName"
                type="text"
                value={formValues.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
              <input
                name="lastName"
                type="text"
                value={formValues.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
              <input
                name="phone"
                type="tel"
                value={formValues.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender*</label>
              <div className="flex space-x-6">
                {['Male', 'Female', 'Other'].map((g) => (
                  <label key={g} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formValues.gender === g}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      required
                    />
                    <span className="text-sm text-gray-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode*</label>
              <input
                name="pincode"
                type="text"
                value={formValues.pincode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                maxLength={6}
                required
              />
              {isFetchingLocation && (
                <div className="absolute right-3 top-8">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
              <input
                name="country"
                type="text"
                value={formValues.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
              <input
                name="state"
                type="text"
                value={formValues.state}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District*</label>
              <input
                name="district"
                type="text"
                value={formValues.district}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
              <input
                name="city"
                type="text"
                value={formValues.city}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Languages Spoken*</label>
              <input
                name="languages"
                type="text"
                value={formValues.languages}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </div>
        </div>


        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="ext-sm font-semibold text-gray-800 mb-4">2. Professional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation*</label>
              <select
                name="designation"
                value={formValues.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Designation</option>
                <option value="MERN Stack">MERN Stack</option>
                <option value="BDE">BDE</option>
                <option value="HR">HR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills*</label>
              <input
                name="skills"
                type="text"
                value={formValues.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience*</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Experience</option>
                <option value="Fresher">Fresher</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`${i+1} Year${i > 0 ? 's' : ''}`}>
                    {i+1} Year{i > 0 && 's'}
                  </option>
                ))}
              </select>
            </div>
            {experience !== 'Fresher' && experience !== '' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Previous Company*</label>
                <input
                  name="prevCompany"
                  type="text"
                  value={formValues.prevCompany}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree*</label>
              <input
                name="degree"
                type="text"
                value={formValues.degree}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course*</label>
              <input
                name="course"
                type="text"
                value={formValues.course}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Certifications</h3>
            {certificates.map((cert, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => {
                      const updated = [...certificates];
                      updated[index].name = e.target.value;
                      setCertificates(updated);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certificate File</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, index, 'certificate')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    accept="image/*,.pdf"
                  />
                </div>
                {certificates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCertificate(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addCertificate}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              + Add Certificate
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="ext-sm font-semibold text-gray-800 mb-4">3. Work & Teaching Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level*</label>
              <div className="flex space-x-6">
                {['Fresher', 'Experienced'].map((level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="experienceLevel"
                      value={level}
                      checked={experienceLevel === level}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      required
                    />
                    <span className="text-sm text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Courses Taught*</label>
              <select
                name="courseTaught"
                value={formValues.courseTaught}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Course</option>
                {masterCourses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teaching Mode*</label>
              <div className="flex space-x-6">
                {['Online', 'Offline', 'Hybrid'].map((mode) => (
                  <label key={mode} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="teachingMode"
                      value={mode}
                      checked={teachingMode === mode}
                      onChange={(e) => setTeachingMode(e.target.value)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      required
                    />
                    <span className="text-sm text-gray-700">{mode}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary*</label>
              <input
                name="expectedSalary"
                type="number"
                value={formValues.expectedSalary}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
          </div>
        </div>

   
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="ext-sm font-semibold text-gray-800 mb-4">4. Additional Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                value={formValues.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status*</label>
              <div className="flex space-x-6">
                {['Active', 'Inactive'].map((s) => (
                  <label key={s} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={status === s}
                      onChange={(e) => setStatus(e.target.value)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      required
                    />
                    <span className="text-sm text-gray-700">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="ext-sm font-semibold text-gray-800 mb-4">5. Documentary Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number*</label>
              <input
                name="aadhaar"
                type="text"
                value={formValues.aadhaar}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number*</label>
              <input
                name="pan"
                type="text"
                value={formValues.pan}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Card*</label>
              <input
                name="aadhaarFile"
                type="file"
                onChange={(e) => handleFileChange(e, 0, 'aadhaar')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                accept="image/*,.pdf"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card*</label>
              <input
                name="panFile"
                type="file"
                onChange={(e) => handleFileChange(e, 0, 'pan')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                accept="image/*,.pdf"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume*</label>
              <input
                name="resumeFile"
                type="file"
                onChange={(e) => handleFileChange(e, 0, 'resume')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                accept=".pdf,.doc,.docx"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">10th Certificate*</label>
              <input
                name="tenthCertFile"
                type="file"
                onChange={(e) => handleFileChange(e, 0, 'tenthCert')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                accept="image/*,.pdf"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Additional Documents</h3>
            {documents.map((doc, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                  <input
                    type="text"
                    value={doc.name}
                    onChange={(e) => {
                      const updated = [...documents];
                      updated[index].name = e.target.value;
                      setDocuments(updated);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document File</label>
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, index, 'document')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </div>
                {documents.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDocument(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addDocument}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              + Add Document
            </button>
          </div>
        </div>

        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : 'Create Trainer'}
          </button>
        </div>
      </form>
    </div>
  );
}