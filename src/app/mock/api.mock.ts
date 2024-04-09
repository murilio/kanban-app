import { EPriority, EType, TDataApi } from "../interfaces/data.interface";

export const APIMOCK: TDataApi[] = [
  {
    title: "To Do",
    type: EType.ToDo,
    options: [
      {
        title: "Brainstorming",
        description:
          "Brainstorming brings team members' diverse experience into play.",
        priority: EPriority.Low,
      },
      {
        title: "Wireframes",
        description:
          "Low fidelity wireframes include the most basic content and visuals.",
        priority: EPriority.Medium,
      },
      {
        title: "Research",
        description:
          "User research helps you to create an optimal product for users.",
        priority: EPriority.Hight,
      },
    ],
  },
  {
    title: "On Progress",
    type: EType.OnProgress,
    options: [
      {
        title: "Onboarding Illustrations ",
        description: "Onboarding Illustrations ",
        priority: EPriority.Low,
      },
      {
        title: "Moodboard",
        description: "Moodboard",
        priority: EPriority.Medium,
      },
    ],
  },
  {
    title: "Done",
    type: EType.Done,
    options: [
      {
        title: "Mobile App Design",
        description: "Mobile App Design",
        priority: EPriority.Completed,
      },
      {
        title: "Design System",
        description: "It just needs to adapt the UI from what you did before ",
        priority: EPriority.Completed,
      },
    ],
  },
];
