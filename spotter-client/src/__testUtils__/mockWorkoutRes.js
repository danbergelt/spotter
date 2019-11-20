const mockWorkoutRes = {
  response: {
    body: {
      workouts: [
        {
          _id: "5dd4a49f2f67ae62f99cec6c",
          date: "Jan 01 2020",
          title: "Workout",
          tags: [
            { color: "red", content: "tag" },
            { color: "blue", content: "tag2" }
          ],
          notes: "Notes for workout",
          exercises: [
            { name: "Exercise", weight: 100, sets: 1, reps: 1 },
            { name: "Exercise2", weight: 200, sets: 2, reps: 2 }
          ],
          user: "5dd4a49f2f67ae62f99cec6b",
          createdAt: "2019-11-20T02:27:43.700Z",
          __v: 0
        }
      ]
    }
  }
};

export default mockWorkoutRes;