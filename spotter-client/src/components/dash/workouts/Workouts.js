import React, { useState, useEffect } from "react";
import WorkoutColumn from "./WorkoutColumn";
import { generateWeek, dashHead } from "../../../utils/momentUtils";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { connect } from "react-redux";
import { fetchWorkouts } from "../../../actions/fetchWorkoutsActions";
import { useHistory } from 'react-router-dom';

const Workouts = ({ data, fetchWorkouts }) => {

  const history = useHistory();

  const { err, isLoading, workouts } = data;

  const [week, setWeek] = useState(0);

  const inc = () => {
    setWeek(week + 1);
  };

  const dec = () => {
    setWeek(week - 1);
  };

  useEffect(() => {
    let range = generateWeek(week);
    range = range.map(d => d.format("MMM DD YYYY"));
    fetchWorkouts(range, history);
  }, [week]);

  return (
    <div className="week-workouts-container">
      <div className="week-workouts-head">
        <div className="week-workouts-icons">
          <FiChevronLeft
            style={{ fontSize: "2.75rem" }}
            data-testid="back"
            onClick={dec}
            className="week-workouts-head-icon"
          />
          <FiChevronRight
            style={{ fontSize: "2.75rem" }}
            data-testid="forward"
            onClick={inc}
            className="week-workouts-head-icon"
          />
        </div>
        {dashHead(week)}
      </div>
      <div className="week-workouts-days">
        {generateWeek(week).map((date, i) => (
          <WorkoutColumn workouts={workouts} date={date} key={i} i={i} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    data: state.fetchWorkoutsReducer
  };
};

export default connect(mapStateToProps, { fetchWorkouts })(Workouts);
