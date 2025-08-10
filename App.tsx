import { useState } from 'react';
import { SessionManager } from './components/SessionManager';

// Mock data matching your Mongoose schema
const mockSessions = [
  {
    _id: '1',
    sprint: { _id: 'sprint1', name: 'React Fundamentals' },
    title: 'Session 1: Introduction to React',
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    durationMinutes: 45,
    watchedPercent: 65,
    slidesUrl: 'https://docs.google.com/presentation/d/1234',
    agendaUrl: 'https://docs.google.com/document/d/5678',
    tasks: [
      {
        _id: 'task1',
        description: 'Complete the React setup exercise',
        type: 'Activity',
        completed: true,
        link: 'https://github.com/react-exercise-1'
      },
      {
        _id: 'task2', 
        description: 'Take the JSX syntax quiz',
        type: 'Quiz',
        completed: false,
        link: 'https://quiz.example.com/jsx'
      }
    ],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    _id: '2',
    sprint: { _id: 'sprint1', name: 'React Fundamentals' },
    title: 'Session 2: Components and Props',
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    durationMinutes: 50,
    watchedPercent: 20,
    slidesUrl: 'https://docs.google.com/presentation/d/2345',
    agendaUrl: null,
    tasks: [
      {
        _id: 'task3',
        description: 'Build a component library',
        type: 'Project',
        completed: false,
        link: 'https://github.com/component-project'
      },
      {
        _id: 'task4',
        description: 'Props passing exercise',
        type: 'Activity', 
        completed: false,
        link: 'https://codepen.io/props-exercise'
      }
    ],
    createdAt: '2024-01-16T10:00:00Z'
  },
  {
    _id: '3',
    sprint: { _id: 'sprint2', name: 'Advanced React Patterns' },
    title: 'Session 1: Hooks Deep Dive',
    recordingUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    durationMinutes: 60,
    watchedPercent: 0,
    slidesUrl: 'https://docs.google.com/presentation/d/3456',
    agendaUrl: 'https://docs.google.com/document/d/7890',
    tasks: [
      {
        _id: 'task5',
        description: 'Custom hooks implementation',
        type: 'Activity',
        completed: false,
        link: 'https://github.com/custom-hooks'
      }
    ],
    createdAt: '2024-01-20T10:00:00Z'
  }
];

const mockSprints = [
  { _id: 'sprint1', name: 'React Fundamentals' },
  { _id: 'sprint2', name: 'Advanced React Patterns' },
  { _id: 'sprint3', name: 'State Management' }
];

export default function App() {
  const [selectedSprints, setSelectedSprints] = useState(['sprint1']);

  return (
    <div className="min-h-screen bg-background">
      <SessionManager 
        sessions={mockSessions}
        sprints={mockSprints}
        selectedSprints={selectedSprints}
        onSprintSelectionChange={setSelectedSprints}
      />
    </div>
  );
}