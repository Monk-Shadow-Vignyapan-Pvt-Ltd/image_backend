import { Contact } from '../models/contact.model.js'; // Adjust path based on your file structure
import ExcelJS from 'exceljs';

// Add a new contact
export const addContact = async (req, res) => {
    try {
        const { name, phone, email, subject,message, isOnline, isContactClose ,userId,followups} = req.body;

        // Validate required fields
        if (!name || !phone || !email || !subject || !message ) {
            return res.status(400).json({ 
                message: 'Please provide all required fields', 
                success: false 
            });
        }

        // Check if a contact with the same email or phone already exists
        // const existingContact = await Contact.findOne({
        //     $or: [{ email }, { phone }]
        // });

        // if (existingContact) {
        //     // Update the existing contact
        //     existingContact.name = name;
        //     existingContact.phone = phone;
        //     existingContact.email = email;
        //     existingContact.subject = subject;
        //     existingContact.message = message;
        //     existingContact.isContactClose = isContactClose;
        //     existingContact.isOnline = isOnline;
        //     existingContact.userId=userId;
        //     // Save the updated contact
        //     await existingContact.save();

        //     return res.status(200).json({ 
        //         message: 'Contact updated successfully', 
        //         contact: existingContact, 
        //         success: true 
        //     });
        // }

        // Create a new contact document if no existing contact is found
        const newContact = new Contact({
            name,
            phone,
            email,
            subject,
            message,
            isOnline,
            isContactClose,
            followups,
            userId
        });

        // Save the new contact to the database
        await newContact.save();

        res.status(201).json({ 
            message: 'Contact added successfully', 
            contact: newContact, 
            success: true 
        });
    } catch (error) {
        console.error('Error adding/updating contact:', error);
        res.status(500).json({ 
            message: 'Failed to process the request', 
            success: false 
        });
    }
};


// Get all contacts
export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (!contacts ) {
            return res.status(404).json({ message: "No contacts found", success: false });
        }
        return res.status(200).json({ contacts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch contacts', success: false });
    }
};

export const downloadContactsExcel = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate required date fields
    if (!startDate || !endDate) {
      return res.status(400).json({
        message: 'Please provide startDate and endDate in query params (YYYY-MM-DD)',
        success: false
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include end of the day

    // Fetch contacts within the date range
    const contacts = await Contact.find({
      createdAt: { $gte: start, $lte: end }
    }).sort({ createdAt: -1 });

    if (contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found in this date range', success: false });
    }

    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Contacts');

    // Add header row
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Subject', key: 'subject', width: 25 },
      { header: 'Message', key: 'message', width: 40 },
      { header: 'Type', key: 'type', width: 18 },
      { header: 'Is Contact Closed', key: 'isContactClose', width: 18 },
      { header: 'User ID', key: 'userId', width: 24 },
      { header: 'Created At', key: 'createdAt', width: 20 }
    ];

    // Add data rows
    contacts.forEach(contact => {
      worksheet.addRow({
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        isContactClose: contact.isContactClose ? 'Yes' : 'No',
        type:contact.isOnline ? 'Online' : 'Offline',
        userId: contact.userId || '',
        createdAt: contact.createdAt.toISOString().split('T')[0]
      });
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=contacts_${startDate}_to_${endDate}.xlsx`);

    // Write to response stream
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error generating Excel:', error);
    res.status(500).json({ message: 'Failed to generate Excel', success: false });
  }
};

export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email, subject,message, isOnline, isContactClose,userId,followups } = req.body;

        const updatedData = {name, phone, email, subject,message, isOnline, isContactClose,userId,followups};

        const contact = await Contact.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!contact) return res.status(404).json({ message: "Contact not found!", success: false });
        return res.status(200).json({ contact, success: true });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message, success: false });
    }
};
