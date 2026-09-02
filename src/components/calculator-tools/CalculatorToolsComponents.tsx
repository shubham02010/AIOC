"use client";

import { useState } from "react";

function ResultCard({ title, value, subtitle }: { title: string; value: string; subtitle?: string }) {
  return (
    <div style={{ padding: "16px 20px", background: "var(--surface-sunken)", borderRadius: "var(--radius)", border: "1px solid var(--line)" }}>
      <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent)", marginTop: 4 }}>{value}</div>
      {subtitle && <div style={{ fontSize: 11, color: "var(--text-soft)", marginTop: 2 }}>{subtitle}</div>}
    </div>
  );
}

function InputField({ label, value, onChange, prefix, suffix, type = "number" }: { label: string; value: number | string; onChange: (v: string) => void; prefix?: string; suffix?: string; type?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <label style={{ fontSize: 11, color: "var(--muted)" }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", background: "var(--surface-sunken)", borderRadius: 6, border: "1px solid var(--line)", padding: "0 10px" }}>
        {prefix && <span style={{ fontSize: 12, color: "var(--muted)", marginRight: 4 }}>{prefix}</span>}
        <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ flex: 1, padding: "8px 0", background: "transparent", border: "none", color: "var(--text)", fontSize: 13, outline: "none" }} />
        {suffix && <span style={{ fontSize: 12, color: "var(--muted)", marginLeft: 4 }}>{suffix}</span>}
      </div>
    </div>
  );
}

// 1. Percentage Calculator
export function PercentageCalculatorTool() {
  const [val1, setVal1] = useState(15);
  const [val2, setVal2] = useState(200);
  const result = ((val1 / 100) * val2).toFixed(2);

  const [a, setA] = useState(25);
  const [b, setB] = useState(100);
  const pctResult = ((a / Math.max(b, 1)) * 100).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>What is X% of Y?</div>
          <InputField label="Percentage (X)" value={val1} onChange={v => setVal1(parseFloat(v) || 0)} suffix="%" />
          <InputField label="Total Value (Y)" value={val2} onChange={v => setVal2(parseFloat(v) || 0)} />
          <ResultCard title="Result" value={result} subtitle={`${val1}% of ${val2} is ${result}`} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>X is what % of Y?</div>
          <InputField label="Value (X)" value={a} onChange={v => setA(parseFloat(v) || 0)} />
          <InputField label="Total (Y)" value={b} onChange={v => setB(parseFloat(v) || 0)} />
          <ResultCard title="Percentage" value={`${pctResult}%`} subtitle={`${a} is ${pctResult}% of ${b}`} />
        </div>
      </div>
    </section>
  );
}

// 2. Discount Calculator
export function DiscountCalculatorTool() {
  const [price, setPrice] = useState(100);
  const [discount, setDiscount] = useState(20);
  const savings = (price * (discount / 100)).toFixed(2);
  const finalPrice = (price - parseFloat(savings)).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Original Price" value={price} onChange={v => setPrice(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Discount Percentage" value={discount} onChange={v => setDiscount(parseFloat(v) || 0)} suffix="%" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Final Price" value={`$${finalPrice}`} />
          <ResultCard title="Total Savings" value={`$${savings}`} subtitle={`${discount}% off original price`} />
        </div>
      </div>
    </section>
  );
}

// 3. Tip Calculator
export function TipCalculatorTool() {
  const [bill, setBill] = useState(85);
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(3);

  const tipTotal = (bill * (tipPct / 100)).toFixed(2);
  const grandTotal = (bill + parseFloat(tipTotal)).toFixed(2);
  const perPerson = (parseFloat(grandTotal) / Math.max(people, 1)).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Bill Amount" value={bill} onChange={v => setBill(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Tip Percentage" value={tipPct} onChange={v => setTipPct(parseFloat(v) || 0)} suffix="%" />
          <InputField label="Number of People" value={people} onChange={v => setPeople(parseInt(v) || 1)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Per Person Pay" value={`$${perPerson}`} />
          <ResultCard title="Total Tip" value={`$${tipTotal}`} subtitle={`Bill: $${bill} + Tip: $${tipTotal} = $${grandTotal}`} />
        </div>
      </div>
    </section>
  );
}

// 4. Margin Calculator
export function MarginCalculatorTool() {
  const [cost, setCost] = useState(50);
  const [revenue, setRevenue] = useState(80);

  const profit = revenue - cost;
  const margin = ((profit / Math.max(revenue, 1)) * 100).toFixed(2);
  const markup = ((profit / Math.max(cost, 1)) * 100).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Cost of Goods" value={cost} onChange={v => setCost(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Selling Price / Revenue" value={revenue} onChange={v => setRevenue(parseFloat(v) || 0)} prefix="$" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Gross Profit" value={`$${profit.toFixed(2)}`} />
          <ResultCard title="Profit Margin" value={`${margin}%`} subtitle={`Markup: ${markup}%`} />
        </div>
      </div>
    </section>
  );
}

// 5. ROI Calculator
export function ROICalculatorTool() {
  const [invested, setInvested] = useState(1000);
  const [returned, setReturned] = useState(1500);

  const netProfit = returned - invested;
  const roi = ((netProfit / Math.max(invested, 1)) * 100).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Amount Invested" value={invested} onChange={v => setInvested(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Amount Returned" value={returned} onChange={v => setReturned(parseFloat(v) || 0)} prefix="$" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="ROI" value={`${roi}%`} />
          <ResultCard title="Net Profit" value={`$${netProfit.toFixed(2)}`} subtitle={`Invested $${invested} → Returned $${returned}`} />
        </div>
      </div>
    </section>
  );
}

// 6. Compound Interest Calculator
export function CompoundInterestCalculatorTool() {
  const [principal, setPrincipal] = useState(5000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [freq, setFreq] = useState(12);

  const amount = principal * Math.pow(1 + rate / 100 / freq, freq * years);
  const interest = amount - principal;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Initial Principal" value={principal} onChange={v => setPrincipal(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Annual Interest Rate" value={rate} onChange={v => setRate(parseFloat(v) || 0)} suffix="%" />
          <InputField label="Time Period" value={years} onChange={v => setYears(parseFloat(v) || 0)} suffix="years" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Future Value" value={`$${amount.toFixed(2)}`} />
          <ResultCard title="Total Interest Earned" value={`$${interest.toFixed(2)}`} subtitle={`Compounded ${freq} times per year`} />
        </div>
      </div>
    </section>
  );
}

// 7. Loan EMI Calculator
export function LoanEMICalculatorTool() {
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(8.5);
  const [tenureMonths, setTenureMonths] = useState(36);

  const r = rate / 12 / 100;
  const emi = (amount * r * Math.pow(1 + r, tenureMonths)) / (Math.pow(1 + r, tenureMonths) - 1);
  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - amount;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Loan Amount" value={amount} onChange={v => setAmount(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Annual Interest Rate" value={rate} onChange={v => setRate(parseFloat(v) || 0)} suffix="%" />
          <InputField label="Loan Tenure" value={tenureMonths} onChange={v => setTenureMonths(parseInt(v) || 1)} suffix="months" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Monthly EMI" value={`$${isNaN(emi) ? "0.00" : emi.toFixed(2)}`} />
          <ResultCard title="Total Interest Payable" value={`$${isNaN(totalInterest) ? "0.00" : totalInterest.toFixed(2)}`} subtitle={`Total Payment: $${isNaN(totalPayment) ? "0.00" : totalPayment.toFixed(2)}`} />
        </div>
      </div>
    </section>
  );
}

// 8. Mortgage Calculator
export function MortgageCalculatorTool() {
  const [homeValue, setHomeValue] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);

  const loanAmount = homeValue - downPayment;
  const r = rate / 12 / 100;
  const n = years * 12;
  const monthly = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Home Price" value={homeValue} onChange={v => setHomeValue(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Down Payment" value={downPayment} onChange={v => setDownPayment(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Interest Rate" value={rate} onChange={v => setRate(parseFloat(v) || 0)} suffix="%" />
          <InputField label="Loan Term" value={years} onChange={v => setYears(parseInt(v) || 1)} suffix="years" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Monthly Payment" value={`$${isNaN(monthly) ? "0.00" : monthly.toFixed(2)}`} />
          <ResultCard title="Principal Loan Amount" value={`$${loanAmount.toFixed(2)}`} subtitle={`Down Payment: ${((downPayment / homeValue) * 100).toFixed(1)}%`} />
        </div>
      </div>
    </section>
  );
}

// 9. Salary Paycheck Calculator
export function SalaryPaycheckCalculatorTool() {
  const [hourly, setHourly] = useState(35);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);

  const weekly = hourly * hoursPerWeek;
  const annual = weekly * 52;
  const monthly = annual / 12;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Hourly Wage" value={hourly} onChange={v => setHourly(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Hours per Week" value={hoursPerWeek} onChange={v => setHoursPerWeek(parseFloat(v) || 0)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Annual Salary" value={`$${annual.toLocaleString()}`} />
          <ResultCard title="Monthly / Weekly Pay" value={`$${monthly.toFixed(2)} / mo`} subtitle={`$${weekly.toFixed(2)} / week`} />
        </div>
      </div>
    </section>
  );
}

// 10. CAGR Calculator
export function CAGRCalculatorTool() {
  const [startVal, setStartVal] = useState(10000);
  const [endVal, setEndVal] = useState(25000);
  const [years, setYears] = useState(5);

  const cagr = ((Math.pow(endVal / startVal, 1 / years) - 1) * 100).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Initial Value" value={startVal} onChange={v => setStartVal(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Final Value" value={endVal} onChange={v => setEndVal(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Number of Years" value={years} onChange={v => setYears(parseFloat(v) || 1)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="CAGR" value={`${isNaN(parseFloat(cagr)) ? "0" : cagr}%`} subtitle="Compound Annual Growth Rate" />
        </div>
      </div>
    </section>
  );
}

// 11. VAT / GST Tax Calculator
export function VATGSTCalculatorTool() {
  const [amount, setAmount] = useState(100);
  const [taxRate, setTaxRate] = useState(20);

  const taxAmount = amount * (taxRate / 100);
  const totalWithTax = amount + taxAmount;
  const baseFromTotal = amount / (1 + taxRate / 100);
  const taxFromTotal = amount - baseFromTotal;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Amount" value={amount} onChange={v => setAmount(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Tax Rate" value={taxRate} onChange={v => setTaxRate(parseFloat(v) || 0)} suffix="%" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Exclusive (Add Tax)" value={`$${totalWithTax.toFixed(2)}`} subtitle={`Tax: $${taxAmount.toFixed(2)}`} />
          <ResultCard title="Inclusive (Remove Tax)" value={`$${baseFromTotal.toFixed(2)}`} subtitle={`Tax portion: $${taxFromTotal.toFixed(2)}`} />
        </div>
      </div>
    </section>
  );
}

// 12. Break-Even Calculator
export function BreakEvenCalculatorTool() {
  const [fixedCosts, setFixedCosts] = useState(5000);
  const [pricePerUnit, setPricePerUnit] = useState(50);
  const [costPerUnit, setCostPerUnit] = useState(20);

  const marginPerUnit = pricePerUnit - costPerUnit;
  const breakEvenUnits = fixedCosts / Math.max(marginPerUnit, 0.01);
  const breakEvenRevenue = breakEvenUnits * pricePerUnit;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Fixed Costs" value={fixedCosts} onChange={v => setFixedCosts(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Price per Unit" value={pricePerUnit} onChange={v => setPricePerUnit(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Variable Cost per Unit" value={costPerUnit} onChange={v => setCostPerUnit(parseFloat(v) || 0)} prefix="$" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Break-Even Units" value={`${Math.ceil(breakEvenUnits)} units`} />
          <ResultCard title="Break-Even Revenue" value={`$${breakEvenRevenue.toFixed(2)}`} subtitle={`Contribution Margin: $${marginPerUnit.toFixed(2)} / unit`} />
        </div>
      </div>
    </section>
  );
}

// 13. CPM Calculator
export function CPMCalculatorTool() {
  const [cost, setCost] = useState(500);
  const [impressions, setImpressions] = useState(100000);

  const cpm = (cost / (impressions / 1000)).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Total Campaign Cost" value={cost} onChange={v => setCost(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Total Impressions" value={impressions} onChange={v => setImpressions(parseFloat(v) || 0)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="CPM (Cost Per Mille)" value={`$${isNaN(parseFloat(cpm)) ? "0.00" : cpm}`} subtitle="Cost per 1,000 ad impressions" />
        </div>
      </div>
    </section>
  );
}

// 14. CTR Calculator
export function CTRCalculatorTool() {
  const [clicks, setClicks] = useState(250);
  const [impressions, setImpressions] = useState(10000);

  const ctr = ((clicks / Math.max(impressions, 1)) * 100).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Total Clicks" value={clicks} onChange={v => setClicks(parseFloat(v) || 0)} />
          <InputField label="Total Impressions" value={impressions} onChange={v => setImpressions(parseFloat(v) || 0)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="CTR (Click-Through Rate)" value={`${ctr}%`} subtitle={`${clicks} clicks out of ${impressions} impressions`} />
        </div>
      </div>
    </section>
  );
}

// 15. Conversion Rate Calculator
export function ConversionRateCalculatorTool() {
  const [conversions, setConversions] = useState(45);
  const [visitors, setVisitors] = useState(1500);

  const rate = ((conversions / Math.max(visitors, 1)) * 100).toFixed(2);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Total Conversions" value={conversions} onChange={v => setConversions(parseFloat(v) || 0)} />
          <InputField label="Total Visitors" value={visitors} onChange={v => setVisitors(parseFloat(v) || 0)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Conversion Rate" value={`${rate}%`} subtitle={`${conversions} leads/sales from ${visitors} visitors`} />
        </div>
      </div>
    </section>
  );
}

// 16. Unit Price Comparison Calculator
export function UnitPriceCalculatorTool() {
  const [p1Price, setP1Price] = useState(12);
  const [p1Qty, setP1Qty] = useState(500);

  const [p2Price, setP2Price] = useState(18);
  const [p2Qty, setP2Qty] = useState(900);

  const u1 = (p1Price / Math.max(p1Qty, 1)).toFixed(4);
  const u2 = (p2Price / Math.max(p2Qty, 1)).toFixed(4);

  const winner = parseFloat(u1) < parseFloat(u2) ? "Option 1 is cheaper!" : "Option 2 is cheaper!";

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Option 1</div>
          <InputField label="Price" value={p1Price} onChange={v => setP1Price(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Quantity / Weight" value={p1Qty} onChange={v => setP1Qty(parseFloat(v) || 0)} />
          <ResultCard title="Unit Price 1" value={`$${u1} / unit`} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text)" }}>Option 2</div>
          <InputField label="Price" value={p2Price} onChange={v => setP2Price(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Quantity / Weight" value={p2Qty} onChange={v => setP2Qty(parseFloat(v) || 0)} />
          <ResultCard title="Unit Price 2" value={`$${u2} / unit`} subtitle={winner} />
        </div>
      </div>
    </section>
  );
}

// 17. Sales Tax Calculator
export function SalesTaxCalculatorTool() {
  const [price, setPrice] = useState(250);
  const [taxRate, setTaxRate] = useState(8.25);

  const tax = price * (taxRate / 100);
  const total = price + tax;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Base Price" value={price} onChange={v => setPrice(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Sales Tax Rate" value={taxRate} onChange={v => setTaxRate(parseFloat(v) || 0)} suffix="%" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Total Price" value={`$${total.toFixed(2)}`} />
          <ResultCard title="Tax Amount" value={`$${tax.toFixed(2)}`} subtitle={`Sales Tax (${taxRate}%)`} />
        </div>
      </div>
    </section>
  );
}

// 18. Depreciation Calculator
export function DepreciationCalculatorTool() {
  const [cost, setCost] = useState(15000);
  const [salvage, setSalvage] = useState(3000);
  const [lifeYears, setLifeYears] = useState(5);

  const annualDep = (cost - salvage) / Math.max(lifeYears, 1);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Asset Initial Cost" value={cost} onChange={v => setCost(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Salvage Value" value={salvage} onChange={v => setSalvage(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Useful Life" value={lifeYears} onChange={v => setLifeYears(parseFloat(v) || 1)} suffix="years" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Annual Depreciation" value={`$${annualDep.toFixed(2)} / yr`} />
          <ResultCard title="Total Depreciable Base" value={`$${(cost - salvage).toFixed(2)}`} subtitle="Straight-Line Depreciation Method" />
        </div>
      </div>
    </section>
  );
}

// 19. Future Value Calculator
export function FutureValueCalculatorTool() {
  const [pv, setPv] = useState(5000);
  const [rate, setRate] = useState(6);
  const [periods, setPeriods] = useState(10);

  const fv = pv * Math.pow(1 + rate / 100, periods);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Present Value (PV)" value={pv} onChange={v => setPv(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Interest Rate per Period" value={rate} onChange={v => setRate(parseFloat(v) || 0)} suffix="%" />
          <InputField label="Number of Periods" value={periods} onChange={v => setPeriods(parseFloat(v) || 0)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Future Value (FV)" value={`$${fv.toFixed(2)}`} subtitle={`Growth over ${periods} periods at ${rate}%`} />
        </div>
      </div>
    </section>
  );
}

// 20. Present Value Calculator
export function PresentValueCalculatorTool() {
  const [fv, setFv] = useState(10000);
  const [rate, setRate] = useState(5);
  const [periods, setPeriods] = useState(5);

  const pv = fv / Math.pow(1 + rate / 100, periods);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Future Value (FV)" value={fv} onChange={v => setFv(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Discount Rate per Period" value={rate} onChange={v => setRate(parseFloat(v) || 0)} suffix="%" />
          <InputField label="Number of Periods" value={periods} onChange={v => setPeriods(parseFloat(v) || 0)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Present Value (PV)" value={`$${pv.toFixed(2)}`} subtitle={`Discounted back ${periods} periods`} />
        </div>
      </div>
    </section>
  );
}

// 21. Inflation Calculator
export function InflationCalculatorTool() {
  const [amount, setAmount] = useState(1000);
  const [inflationRate, setInflationRate] = useState(3.5);
  const [years, setYears] = useState(10);

  const futureCost = amount * Math.pow(1 + inflationRate / 100, years);
  const purchasingPower = amount / Math.pow(1 + inflationRate / 100, years);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Current Amount" value={amount} onChange={v => setAmount(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Avg Inflation Rate" value={inflationRate} onChange={v => setInflationRate(parseFloat(v) || 0)} suffix="%" />
          <InputField label="Years in Future" value={years} onChange={v => setYears(parseFloat(v) || 0)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Equivalent Future Cost" value={`$${futureCost.toFixed(2)}`} subtitle={`Purchasing Power of $${amount} becomes $${purchasingPower.toFixed(2)}`} />
        </div>
      </div>
    </section>
  );
}

// 22. Ratio & Aspect Ratio Calculator
export function RatioCalculatorTool() {
  const [w1, setW1] = useState(1920);
  const [h1, setH1] = useState(1080);
  const [targetW, setTargetW] = useState(800);

  const targetH = Math.round((targetW * h1) / Math.max(w1, 1));

  function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
  }
  const divisor = gcd(w1, h1);
  const ratioStr = `${w1 / divisor}:${h1 / divisor}`;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Original Width" value={w1} onChange={v => setW1(parseInt(v) || 1)} />
          <InputField label="Original Height" value={h1} onChange={v => setH1(parseInt(v) || 1)} />
          <InputField label="New Target Width" value={targetW} onChange={v => setTargetW(parseInt(v) || 1)} />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Aspect Ratio" value={ratioStr} />
          <ResultCard title="Scaled Target Height" value={`${targetH} px`} subtitle={`New resolution: ${targetW} × ${targetH}`} />
        </div>
      </div>
    </section>
  );
}

// 23. Rule of 72 Calculator
export function RuleOf72CalculatorTool() {
  const [rate, setRate] = useState(8);
  const years = (72 / Math.max(rate, 0.01)).toFixed(1);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Annual Interest Rate" value={rate} onChange={v => setRate(parseFloat(v) || 0)} suffix="%" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Years to Double" value={`~ ${years} years`} subtitle={`At ${rate}% interest rate, investment doubles in ~${years} years`} />
        </div>
      </div>
    </section>
  );
}

// 24. Commission Calculator
export function CommissionCalculatorTool() {
  const [saleAmount, setSaleAmount] = useState(12000);
  const [commRate, setCommRate] = useState(5);

  const comm = saleAmount * (commRate / 100);

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Total Sale Amount" value={saleAmount} onChange={v => setSaleAmount(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Commission Rate" value={commRate} onChange={v => setCommRate(parseFloat(v) || 0)} suffix="%" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Commission Earned" value={`$${comm.toFixed(2)}`} subtitle={`${commRate}% of $${saleAmount}`} />
        </div>
      </div>
    </section>
  );
}

// 25. Simple Interest Calculator
export function SimpleInterestCalculatorTool() {
  const [principal, setPrincipal] = useState(2000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(3);

  const interest = principal * (rate / 100) * years;
  const total = principal + interest;

  return (
    <section className="json-tool" style={{ padding: 12, display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <InputField label="Principal Amount" value={principal} onChange={v => setPrincipal(parseFloat(v) || 0)} prefix="$" />
          <InputField label="Annual Rate" value={rate} onChange={v => setRate(parseFloat(v) || 0)} suffix="%" />
          <InputField label="Time Period" value={years} onChange={v => setYears(parseFloat(v) || 0)} suffix="years" />
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <ResultCard title="Total Interest" value={`$${interest.toFixed(2)}`} />
          <ResultCard title="Total Amount (P + I)" value={`$${total.toFixed(2)}`} />
        </div>
      </div>
    </section>
  );
}
