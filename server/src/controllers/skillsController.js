import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all skills
export const getSkills = async (req, res) => {
  try {
    const skills = await prisma.skill.findMany();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
};

// Get a single skill by ID
export const getSkillById = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await prisma.skill.findUnique({ where: { id } });
    if (!skill) return res.status(404).json({ error: "Skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skill" });
  }
};

// Create a new skill
export const createSkill = async (req, res) => {
  const { name, proficiency } = req.body;
  try {
    const newSkill = await prisma.skill.create({
      data: { name, proficiency },
    });
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(500).json({ error: "Failed to create skill" });
  }
};

// Update an existing skill
export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name, proficiency } = req.body;
  try {
    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: { name, proficiency },
    });
    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ error: "Failed to update skill" });
  }
};

// Delete a skill
export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.skill.delete({ where: { id } });
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete skill" });
  }
};
