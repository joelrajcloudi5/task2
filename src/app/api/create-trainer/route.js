"use server";
import { NextResponse } from 'next/server';
import ConnectDB from '@/app/utils/db';
import Trainer from '@/app/models/trainerProfile';

export async function POST(request) {
  await ConnectDB();

  try {
    const body = await request.json();


    const requiredFields = ['firstName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

 
    const processBase64 = (base64String) => {
      if (!base64String) return null;
      try {

        const base64Data = base64String.startsWith('data:') 
          ? base64String.split(',')[1] 
          : base64String;
        return Buffer.from(base64Data, 'base64');
      } catch (error) {
        console.error('Error processing base64:', error);
        return null;
      }
    };


    const processArray = (arr) => {
      if (!arr) return [];
      return Array.isArray(arr) ? arr : [arr];
    };


    const stringToArray = (str) => {
      if (!str) return [];
      if (Array.isArray(str)) return str;
      return str.split(',').map(item => item.trim()).filter(item => item);
    };


    const trainer = new Trainer({
      basicInfo: {
        firstName: body.firstName,
        lastName: body.lastName || '',
        email: body.email,
        phone: body.phone,
        gender: body.gender || '',
        pincode: body.pincode || '',
        country: body.country || 'India',
        state: body.state || '',
        district: body.district || '',
        city: body.city || '',
        languagesSpoken: stringToArray(body.languages)
      },
      professionalDetails: {
        designation: body.designation || '',
        skills: stringToArray(body.skills),
        experience: body.experience || '',
        prevCompany: body.prevCompany || '',
        degree: body.degree || '',
        course: body.course || '',
        certifications: processArray(body.certificates).map(cert => ({
          name: cert.name || '',
          fileData: processBase64(cert.file)
        }))
      },
      workTeachingExperience: {
        experienceLevel: body.experienceLevel || '',
        coursesTaught: processArray(body.courseTaught),
        teachingMode: body.teachingMode || '',
        expectedSalary: Number(body.expectedSalary) || 0
      },
      additionalInfo: {
        bio: body.bio || '',
        status: body.status || 'Active'
      },
      documents: {
        aadhaar: body.aadhaar || '',
        pan: body.pan || '',
        aadhaarFileData: processBase64(body.aadhaarFile),
        panFileData: processBase64(body.panFile),
        resumeFileData: processBase64(body.resumeFile),
        tenthCertFileData: processBase64(body.tenthCertFile),
        additionalDocuments: processArray(body.documents).map(doc => ({
          name: doc.name || '',
          fileData: processBase64(doc.file)
        }))
      }
    });

    const savedTrainer = await trainer.save();

    return NextResponse.json({
      success: true,
      message: 'Trainer created successfully',
      data: {
        ...savedTrainer.toObject(),
     
        documents: {
          ...savedTrainer.documents,
          aadhaarFileData: '[Binary Data]',
          panFileData: '[Binary Data]',
          resumeFileData: '[Binary Data]',
          tenthCertFileData: '[Binary Data]',
          additionalDocuments: savedTrainer.documents.additionalDocuments.map(doc => ({
            ...doc,
            fileData: '[Binary Data]'
          }))
        },
        professionalDetails: {
          ...savedTrainer.professionalDetails,
          certifications: savedTrainer.professionalDetails.certifications.map(cert => ({
            ...cert,
            fileData: '[Binary Data]'
          }))
        }
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating trainer:', error);
    return NextResponse.json({
      success: false,
      message: 'Error creating trainer',
      error: error.message
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ConnectDB();
    const trainers = await Trainer.find(); 
    return Response.json({ success: true, trainers });
  } catch (err) {
    return Response.json({ success: false, message: "Failed to fetch", error: err.message }, { status: 500 });
  }
}