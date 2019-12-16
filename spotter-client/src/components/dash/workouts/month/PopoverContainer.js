import React from "react";
import Popover from "react-tiny-popover";
import ViewMoreContent from "./ViewMoreContent";

const PopoverContainer = React.memo(
  ({ children, popover, setPopover, workouts, openViewModal, date }) => {
    return (
      <Popover
        containerClassName={"view-more-popup"}
        isOpen={
          popover.open === true && popover.id === date.format("MMM DD YYYY")
        }
        position={"top"}
        onClickOutside={() => setPopover({ open: false, id: null })}
        content={
          <ViewMoreContent
            setPopover={setPopover}
            workouts={workouts}
            openViewModal={openViewModal}
            date={date}
          />
        }
      >
        {children}
      </Popover>
    );
  }
);

export default PopoverContainer;
