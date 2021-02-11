import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test("this is working", () => {
    render(<ContactForm />)
})

test("fill in inputs, click submit, message will appear on DOM", async () => {
    render(<ContactForm />)

    //query for all inputs
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    //type into inputs
    userEvent.type(firstNameInput, "Honey");
    userEvent.type(lastNameInput, "LaTona");
    userEvent.type(emailInput, "honey@gmail.com");
    userEvent.type(messageInput, "I am a puppy");

    expect(firstNameInput).toHaveValue("Honey");
    expect(lastNameInput).toHaveValue("LaTona");
    expect(emailInput).toHaveValue("honey@gmail.com");
    expect(messageInput).toHaveValue("I am a puppy")

    //negative assertion
    const noHoneyText = await screen.queryByText(/honey/i)
    expect(noHoneyText).toBeNull();

    //query for button
    const button = screen.getByRole("button", { name: /submit/i});

    //click button
    userEvent.click(button);

    //query for text
    const honeyText = await screen.queryByText(/honey/i);

    //assert
    userEvent.tab();
    expect(screen.getByLabelText(/first name/i)).toHaveFocus();
    userEvent.type(screen.getByLabelText(/first name/i), "H");
})