import React, { useEffect } from "react";
import { notifySuccess } from "../../hooks/toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteConsultation,
  fetchAllConsultations,
} from "../../store/consultation-slice";
import ConsultationsTable from "../../components/admin/ConsultationsTable";

const ConsultationList = () => {
  const dispatch = useDispatch();
  const { consultationList } = useSelector((state) => state.consultations);

  function handleDelete(getCurrentConsultationId) {
    dispatch(deleteConsultation(getCurrentConsultationId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllConsultations());
        notifySuccess("Consultation deleted successfully!");
      }
    });
  }

  useEffect(() => {
    dispatch(fetchAllConsultations());
  }, [dispatch]);

  return (
    <div className="!p-4">
      <ConsultationsTable
        consultations={consultationList || []}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ConsultationList;
