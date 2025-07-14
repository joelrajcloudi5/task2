import connectDB from "@/app/utils/db";
import Trainer from "@/app/models/trainerProfile";

export const DELETE = async (req, { params }) => {
  try {
    await connectDB();
    const trainer = await Trainer.findByIdAndDelete(params.id);
    if (!trainer) {
      return Response.json({ error: "Trainer not found" }, { status: 404 });
    }
    return Response.json({ message: "Trainer deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting trainer:", error);
    return Response.json({ error: "Failed to delete trainer" }, { status: 500 });
  }
};
