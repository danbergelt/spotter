import React from "react";

const WorkoutDataContext = React.createContext({});

export const WorkoutDataProvider = WorkoutDataContext.Provider;
export const WorkoutDataConsumer = WorkoutDataContext.Consumer;
