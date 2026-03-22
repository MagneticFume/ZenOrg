import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, Internship } from '../types';

const NOTES_KEY = '@zenorg_notes';
const INTERNSHIPS_KEY = '@zenorg_internships';

// Note operations
export const saveNotes = async (notes: Note[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error saving notes:', error);
    throw error;
  }
};

export const loadNotes = async (): Promise<Note[]> => {
  try {
    const data = await AsyncStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading notes:', error);
    return [];
  }
};

export const createNote = async (title: string, content: string): Promise<Note> => {
  const notes = await loadNotes();
  const newNote: Note = {
    id: Date.now().toString(),
    title,
    content,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  notes.unshift(newNote);
  await saveNotes(notes);
  return newNote;
};

export const updateNote = async (id: string, title: string, content: string): Promise<void> => {
  const notes = await loadNotes();
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      content,
      updatedAt: Date.now(),
    };
    await saveNotes(notes);
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  const notes = await loadNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  await saveNotes(filteredNotes);
};

// Internship operations
export const saveInternships = async (internships: Internship[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(INTERNSHIPS_KEY, JSON.stringify(internships));
  } catch (error) {
    console.error('Error saving internships:', error);
    throw error;
  }
};

export const loadInternships = async (): Promise<Internship[]> => {
  try {
    const data = await AsyncStorage.getItem(INTERNSHIPS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading internships:', error);
    return [];
  }
};

export const loadInternshipById = async (id: string): Promise<Internship | null> => {
  try {
    const internships = await loadInternships();
    const internship = internships.find(i => i.id === id);
    return internship || null;
  } catch (error) {
    console.error('Error loading internship by id:', error);
    return null;
  }
};

export const createInternship = async (data: Omit<Internship, 'id' | 'createdAt' | 'updatedAt'>): Promise<Internship> => {
  const internships = await loadInternships();
  const newInternship: Internship = {
    ...data,
    id: Date.now().toString(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  internships.unshift(newInternship);
  await saveInternships(internships);
  return newInternship;
};

export const updateInternship = async (id: string, data: Partial<Internship>): Promise<void> => {
  const internships = await loadInternships();
  const index = internships.findIndex(i => i.id === id);
  if (index !== -1) {
    internships[index] = {
      ...internships[index],
      ...data,
      updatedAt: Date.now(),
    };
    await saveInternships(internships);
  }
};

export const deleteInternship = async (id: string): Promise<void> => {
  const internships = await loadInternships();
  const filteredInternships = internships.filter(i => i.id !== id);
  await saveInternships(filteredInternships);
};
