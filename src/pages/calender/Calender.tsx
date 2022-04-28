import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Month from "../../components/calender/Month";
import CalenderHeader from "../../components/headers/CalenderHeader";
import Modal from "../../components/modal/Modal";
import AddEventModal from "../../components/modal/modalComponents/AddEventModal";
import { useGlobalContext } from "../../store/context";
import { getMonth } from "../../utils/utils";

const Calender: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs[][]>(getMonth);

  const { showAddEventModal, setShowAddEventModal, monthIndex } =
    useGlobalContext();

  // set the month to the new month incase its changed
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className="text-gray-900">
      <div className="flex justify-between items-center gap-3">
        <span className="title">Calender</span>
        <CalenderHeader />
      </div>

      <div className="mt-2">
        <Month month={currentMonth} />

        {/* add event modal */}
        <Modal
          component={<AddEventModal />}
          modalState={showAddEventModal}
          close={() => setShowAddEventModal(false)}
          type=""
        />
      </div>
    </div>
  );
};

export default Calender;
