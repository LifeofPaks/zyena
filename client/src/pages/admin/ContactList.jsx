import React, { useEffect } from "react";
import { deleteContact, fetchAllContacts } from "../../store/contact-slice";
import { useDispatch, useSelector } from "react-redux";
import ContactTable from "../../components/admin/ContactsTable";
import { notifySuccess } from "../../hooks/toastify";

const ContactList = () => {
  const dispatch = useDispatch();
  const { contactList } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  function handleDelete(getCurrentContactId) {
    dispatch(deleteContact(getCurrentContactId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllContacts());
        notifySuccess("Contact deleted successfully!");
      }
    });
  }

  return (
    <div className="!p-4">
      <ContactTable contacts={contactList || []} handleDelete={handleDelete} />
    </div>
  );
};

export default ContactList;
