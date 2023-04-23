import React, { useState } from "react";

const LoyaltyProgram = () => {
    const [cost, setCost] = useState(0);
    const [points, setPoints] = useState(0);
    const [usedPoints, setUsedPoints] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");

    const handleCostChange = (event) => {
        setCost(parseFloat(event.target.value));
    };

    const handlePointsChange = (event) => {
        setUsedPoints(parseFloat(event.target.value));
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePurchase = () => {
        const remainingPoints = points - usedPoints;
        const discountedCost = Math.max(cost - usedPoints, 0);
        console.log(`Processed purchase for $${discountedCost}`);
        setPoints(remainingPoints);
        setCost(0);
        setUsedPoints(0);
    };

    const handleRegisterAndPurchase = () => {
        const remainingPoints = Math.floor(cost / 10) * 10;
        console.log(`Registered user ${firstName} with email ${email} and earned ${remainingPoints} points`);
        setPoints(remainingPoints);
        setCost(0);
    };

    return (
        <div>
            <h1>Loyalty Program</h1>

            {/* Registered users */}
            {points > 0 && (
                <div>
                    <h2>Registered Users</h2>
                    <p>Enter the cost of your purchase:</p>
                    <input type="number" value={cost} onChange={handleCostChange} />
                    <br />
                    <p>You currently have {points} points.</p>
                    <p>Use <input type="number" min={0} max={points} value={usedPoints} onChange={handlePointsChange} /> points to reduce the cost.</p>
                    <p>Total cost: ${Math.max(cost - usedPoints, 0)}</p>
                    <button onClick={handlePurchase}>Purchase</button>
                </div>
            )}

            {/* Unregistered users */}
            {points === 0 && (
                <div>
                    <h2>Unregistered Users</h2>
                    <p>Please provide your information:</p>
                    <label htmlFor="fname-input">First name:</label>
                    <input type="text" id="fname-input" name="fname" required onChange={handleFirstNameChange} />
                    <br />
                    <label htmlFor="email-input">Email:</label>
                    <input type="email" id="email-input" name="email" required onChange={handleEmailChange} />
                    <br />
                    <button onClick={handleRegisterAndPurchase}>Register and Purchase</button>
                </div>
            )}
        </div>
    );
};

export default LoyaltyProgram;
