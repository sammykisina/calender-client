import dayjs from "dayjs";
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const AppContext = React.createContext();

// a reducer to receive event actions and act as indicated
const eventReducer = (state, { type, payload }) => {
  switch (type) {
    case "CREATE":
      return [...state, payload];

    case "UPDATE":
      return state.map((event) => (event.id === payload.id ? payload : event));

    case "DELETE":
      return state.filter((event) => event.id !== payload.id);

    default:
      throw new Error();
  }
};

// a reducer to receive activity actions and act as indicated
const activityReducer = (state, { type, payload }) => {
  switch (type) {
    case "CREATE":
      return [...state, payload];
    case "UPDATE":
      return state.map((activity) =>
        activity.id === payload.id ? payload : activity
      );

    case "DELETE":
      return state.filter((activity) => activity.id !== payload.id);

    case "COMPLETE":
      return state.map((activity) =>
        activity.id === payload.id ? { ...activity, complete: true } : activity
      );

    // case "INCOMPLETE":
    //   return state.map((activity) =>
    //     activity.id === payload.id ? { ...activity, complete: false } : activity
    //   );

    default:
      throw new Error();
  }
};

// initial Events of the app depending on what is stored in  the local storage
const initialEvents = () => {
  const storedEvents = localStorage.getItem("savedEvents");

  const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];

  return parsedEvents;
};

// initial Activities of the app depending on what is stored in the local storage
const initialActivities = () => {
  const storedActivities = localStorage.getItem("savedActivities");
  const parsedActivities = storedActivities ? JSON.parse(storedActivities) : [];

  return parsedActivities;
};

export const AppProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalenderMonthIndex, setSmallCalenderMonthIndex] = useState(null);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [viewEventsModal, setViewEventsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [activityLabels, setActivityLabels] = useState([]);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [openCompleteActivities, setOpenCompleteActivities] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [inCompleted, setInCompleted] = useState([]);

  // the events reducer
  const [savedEvents, dispatchCalEvent] = useReducer(
    eventReducer,
    [],
    initialEvents
  );

  // listening to the month index of small calender change
  useEffect(() => {
    if (smallCalenderMonthIndex !== null) {
      setMonthIndex(smallCalenderMonthIndex);
    }
  }, [smallCalenderMonthIndex]);

  // a useEffect to act anytime there is a change in the events reducer
  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  // the activities reducer
  const [savedActivities, dispatchCalActivities] = useReducer(
    activityReducer,
    [],
    initialActivities
  );

  // a useEffect to act anytime there is a change in the activity reducer
  useEffect(() => {
    localStorage.setItem("savedActivities", JSON.stringify(savedActivities));
  }, [savedActivities]);

  useEffect(() => {
    setActivityLabels((prevActivityLabels) => {
      return [
        ...new Set(savedActivities.map((savedActivity) => savedActivity.label)),
      ].map((label) => {
        const currentActivityLabel = prevActivityLabels.find(
          (label) => label.label === label
        );
        return {
          label,
          checked: currentActivityLabel ? currentActivityLabel.checked : true,
        };
      });
    });
  }, [savedActivities]);

  // function to update the activity labels
  const updateActivityLabels = (passedActivityLabel) => {
    setActivityLabels(
      activityLabels.map((activityLabel) =>
        activityLabel.label === passedActivityLabel.label
          ? passedActivityLabel
          : activityLabel
      )
    );
  };

  // filtered activities depending on the currently chosen activity table
  const filteredActivities = useMemo(() => {
    return savedActivities.filter((savedActivity) =>
      activityLabels
        .filter((activityLabel) => activityLabel.checked)
        .map((activityLabel) => activityLabel.label)
        .includes(savedActivity.label)
    );
  }, [savedActivities, activityLabels]);

  // clean  the modal
  useEffect(() => {
    if (!showAddActivity) {
      setSelectedActivity(null);
    }
  }, [showAddActivity]);

  // grouping all the activities as either complete or incomplete
  useEffect(() => {
    setInCompleted(
      filteredActivities.filter(
        (filteredActivity) => filteredActivity.complete !== true
      )
    );

    setCompleted(
      filteredActivities.filter(
        (filteredActivity) => filteredActivity.complete === true
      )
    );
  }, [filteredActivities]);

  return (
    <AppContext.Provider
      value={{
        monthIndex,
        setMonthIndex,

        smallCalenderMonthIndex,
        setSmallCalenderMonthIndex,

        selectedDay,
        setSelectedDay,

        showAddEventModal,
        setShowAddEventModal,

        toggleSidebar,
        setToggleSidebar,

        savedEvents,
        dispatchCalEvent,

        viewEventsModal,
        setViewEventsModal,

        selectedEvent,
        setSelectedEvent,

        showAddActivity,
        setShowAddActivity,

        savedActivities,
        dispatchCalActivities,

        activityLabels,
        setActivityLabels,
        updateActivityLabels,
        filteredActivities,

        selectedActivity,
        setSelectedActivity,

        openCompleteActivities,
        setOpenCompleteActivities,

        completed,
        inCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
