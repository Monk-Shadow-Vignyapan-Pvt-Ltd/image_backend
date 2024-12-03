import { NewsLetter } from "../models/newsletter.model.js";

export const addNewsLetter = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validate required fields
        if (!name  || !email ) {
            return res.status(400).json({ 
                message: 'Please provide all required fields', 
                success: false 
            });
        }

        // Check if a contact with the same email or phone already exists
        const existingNewsLetter = await NewsLetter.findOne({
            $or: [{ email }, { name }]
        });

        if (existingNewsLetter) {
            // Update the existing contact
            existingNewsLetter.name = name;
            existingNewsLetter.email = email;
            // Save the updated contact
            await existingNewsLetter.save();

            return res.status(200).json({ 
                message: 'News Letter updated successfully', 
                contact: existingNewsLetter, 
                success: true 
            });
        }

        // Create a new contact document if no existing contact is found
        const newNewsLetter = new NewsLetter({
            name,
            email
        });

        // Save the new contact to the database
        await newNewsLetter.save();

        res.status(201).json({ 
            message: 'NewsLetter added successfully', 
            contact: newNewsLetter, 
            success: true 
        });
    } catch (error) {
        console.error('Error adding/updating News Letter:', error);
        res.status(500).json({ 
            message: 'Failed to process the request', 
            success: false 
        });
    }
};


// Get all contacts
export const getNewsLetters = async (req, res) => {
    try {
        const newsletters = await NewsLetter.find();
        if (!newsletters ) {
            return res.status(404).json({ message: "No newsletters found", success: false });
        }
        return res.status(200).json({ newsletters });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to fetch newsletters', success: false });
    }
};