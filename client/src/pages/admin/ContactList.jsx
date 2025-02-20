import React, { useEffect } from "react";
import { fetchAllContacts } from "../../store/contact-slice";
import { useDispatch, useSelector } from "react-redux";
import ContactTable from "../../components/admin/ContactsTable";


const ContactList = () => {
  const dispatch = useDispatch();
  const { contactList } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);
  
  return (
    <div className="!p-4">
      <ContactTable contacts={contactList || []} />
    </div>
  );
};

export default ContactList;