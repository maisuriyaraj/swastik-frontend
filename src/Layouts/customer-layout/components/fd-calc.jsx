import React, { useState } from 'react';
import './customerLayout.scss';
import { Button } from '@mui/material';
import { PieChart } from '../../../components/chartComponent';

export default function FdCalc() {
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [investmentPeriod, setInvestmentPeriod] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [totalInterest, setTotalInterest] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const totalInterestValue = investmentAmount * investmentPeriod * interestRate / (12 * 100);
        const totalAmountValue = totalInterestValue + investmentAmount;

        setTotalInterest(totalInterestValue.toFixed(2));
        setTotalAmount(totalAmountValue.toFixed(2));
    };

    return (
        <div className="fd-calculator mt-4" id="fd-calc">
            <h2 className="text-start mb-4">Try Fixed Deposit Calculator</h2>
            <div className='row'>
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mt-2 mb-3">
                            <label htmlFor="investmentAmount">Investment Amount</label>
                            <input
                                type="number"
                                className="form-control p-3"
                                id="investmentAmount"
                                placeholder="Enter Investment Amount"
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))}
                                required
                            />
                        </div>

                        <div className="form-group mt-2 mb-3">
                            <label htmlFor="investmentPeriod">Investment Period (Monthly)</label>
                            <input
                                type="number"
                                className="form-control p-3"
                                id="investmentPeriod"
                                placeholder="Enter Investment Period"
                                value={investmentPeriod}
                                onChange={(e) => setInvestmentPeriod(parseFloat(e.target.value))}
                                required
                            />
                        </div>

                        <div className="form-group mt-2 mb-3">
                            <label htmlFor="interestRate">Interest Rate(%)</label>
                            <input
                                type="number"
                                className="form-control p-3"
                                id="interestRate"
                                placeholder="Enter Investment Rate"
                                value={interestRate}
                                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                required
                            />
                        </div>

                        <Button type="submit" variant='contained' size='large'>
                            Calculate
                        </Button>
                    </form>
                </div>
                <div className='col-md-6'>
                    {totalAmount && (
                        <>
                            <div style={{height:300,width:'100%',display:'flex',justifyContent:'center'}}>
                            <PieChart  data1={ totalAmount} label1={'Total Amount'} data2= {totalInterest} label2 = {'Total Interest'} />
                            </div>
                            <div className="output mt-4 text-center">
                                <h3>Result</h3>
                                <p>Total Amount: ₹ {totalAmount}</p>
                                <p>Total Interest: ₹ {totalInterest}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
