import React, { useState } from 'react';
import { Button } from '@mui/material';
import { PieChart } from '../../../components/chartComponent';

export default function EmiCalc() {
    const [loanAmount, setLoanAmount] = useState('');
    const [loanPeriod, setLoanPeriod] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [monthlyEMI, setMonthlyEMI] = useState('');
    const [totalInterest, setTotalInterest] = useState('');
    const [totalAmountPayable, setTotalAmountPayable] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const monthlyInterestRate = interestRate / 12 / 100;
        const emi =
            (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -loanPeriod));
        const totalInterestValue = emi * loanPeriod - loanAmount;
        const totalAmountValue = parseFloat(loanAmount) + totalInterestValue;

        setMonthlyEMI(emi.toFixed(2));
        setTotalInterest(totalInterestValue.toFixed(2));
        setTotalAmountPayable(totalAmountValue.toFixed(2));

    }
    return (
        <div className="emi-calculator mt-5">
            <h2 className="text-center mb-4">EMI Calculator</h2>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-2 mb-3">
                            <label htmlFor="loanAmount">Loan Amount</label>
                            <input
                                type="number"
                                className="form-control p-3"
                                id="loanAmount"
                                placeholder="Enter Loan Amount"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mt-2 mb-3">
                            <label htmlFor="loanPeriod">Loan Period (Months)</label>
                            <input
                                type="number"
                                className="form-control p-3"
                                id="loanPeriod"
                                placeholder="Enter Loan Period"
                                value={loanPeriod}
                                onChange={(e) => setLoanPeriod(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group mt-2 mb-3">
                            <label htmlFor="interestRate">Interest Rate (%)</label>
                            <input
                                type="number"
                                className="form-control p-3"
                                id="interestRate"
                                placeholder="Enter Interest Rate"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" variant='contained' size='large'>
                            Calculate
                        </Button>
                    </form>
                </div>
                <div className='col-md-6'>
                    {monthlyEMI && (
                        <>
                            <div style={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <PieChart data1={totalAmountPayable} label1={'Total Amount'} data2={totalInterest} label2={'Total Interest'} />

                            </div>
                            <div className="output mt-4 text-center">
                                <h3>Result</h3>
                                <p>Monthly EMI: ₹ {monthlyEMI}</p>
                                <p>Total Interest: ₹ {totalInterest}</p>
                                <p>Total Amount Payable: ₹ {totalAmountPayable}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    )
}
