import React, { useState } from 'react';
import '../css/SupportStyling.css';

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    topic: string;
    description: string;
}

const Support: React.FC = () => {
    const[isTicketSent, setTicketSent] = useState<boolean>(false);
    const[randomNumber, setRandomNumber] = useState<number | null>(null);
    const[formState, setFormState] = useState<FormState>({
        firstName: '',
        lastName: '',
        email: '',
        topic: '',
        description: '',
    });
    const isSendButtonDisabled = () => {
        const { firstName, lastName, email, topic } = formState;
        return !(firstName && lastName && email && topic);
    };
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        const { firstName, lastName, email, topic } = formState;
        if(firstName && lastName && email && topic){
            setRandomNumber(Math.floor(Math.random() * 10000) + 1);
            setTicketSent(true);
        }else{
            alert('Please fill in all required fields.');
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <div className="content-support">
            <header>
                <h1>Support Ticket Form</h1>
                <hr />
            </header>
            {isTicketSent ? (
                <div className="thank-you-message">
                    <h1>Thank you for sending us your report, we will <br />track the problem now</h1>
                    <div className="ticket-wrapper">
                        <p className='ticket'>ticket number: &nbsp;</p>
                        <p>{randomNumber}</p>
                    </div>
                </div>
            ) : (
                <form action="">
                    <div className="support-wrapper">
                        <div className="left-wrapper">
                            <div className="form-wrapper">
                                <div className="name">
                                    <div className="name-wrapper">
                                        <p>Name</p> <p className="star">&nbsp;*</p>
                                    </div>
                                    <div className="input-name">
                                        <div className="first-name">
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formState.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                            <p>First</p>
                                        </div>
                                        <div className="last-name">
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formState.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                            <p>Last</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="email">
                                    <div className="email-wrapper">
                                        <p>Email</p> <p className="star">&nbsp;*</p>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="topic">
                                    <div className="topic-wrapper">
                                        <p>Topic</p> <p className="star">&nbsp;*</p>
                                    </div>
                                    <div className="radio-wrapper">
                                        <p>What can we help you today?</p>
                                        <div className="radio-options">
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="topic"
                                                    value="General"
                                                    checked={formState.topic === 'General'}
                                                    onChange={handleChange}
                                                />
                                                General
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="topic"
                                                    value="Bug"
                                                    checked={formState.topic === 'Bug'}
                                                    onChange={handleChange}
                                                />
                                                Bug
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="right-wrapper">
                            <div className="description">
                                <div className="description-wrapper">
                                    <p>Description</p> <p className="optional">&nbsp;optional</p>
                                </div>
                                <textarea rows={15} cols={30} placeholder="Description Report"></textarea>
                            </div> 
                            <div className="btn-send">
                                <button onClick={handleSend} disabled={isSendButtonDisabled()} className={isSendButtonDisabled() ? 'disabled-btn' : ''}>
                                SEND
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            )}  
        </div>
    );
};

export default Support;
