import React from 'react';

interface CartUserFormProps {
    firstName: string;
    lastName: string;
    setFirstName: (value: string) => void;
    setLastName: (value: string) => void;
}

const CartUserForm: React.FC<CartUserFormProps> = ({ firstName, lastName, setFirstName, setLastName }) => (
    <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="border rounded px-4 py-2 text-black flex-1"
        />
        <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="border rounded px-4 py-2 text-black flex-1"
        />
    </div>
);

export default CartUserForm;
