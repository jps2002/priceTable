let calculateBtn = document.getElementById("calculate-btn");

let result = document.getElementById("result");

let calculate = () => {

    let p = Number(document.getElementById("principal").value); 
    let r = Number(document.getElementById("rate").value);
    let t = Number(document.getElementById("time").value);
    let d = Number(document.getElementById("discount").value);


    console.log("Tabela Price");
    
    // Calcular valor das parcelas

    const installments = []; // representa as parcelas
    let installment = (p * Math.pow(1+r, t) * r) / (Math.pow(1+r, t) - 1)
    for (let month = 0; month <= t; month++) {
        if (month === 0) {
            installments.push(p);
        } else {
            installments.push(installment);
        }
        console.log(`Mês ${month} ${installments[month]}`);
    }

    // Calcular valor dos juros e amortizações

    const debtByMonth = [];
    const interests = []; // representa os juros mensais
    const repayments = []; // representa as amortizações da dívida
    for (let month = 0; month <= t; month++) {
        if (month === 0) {
            debtByMonth.push(p);
            interests.push(0.0);
            repayments.push(0.0);
        } else {
            // juros do mês = saldo devedor do mês anterior * taxa
            interests.push(debtByMonth[month-1] * r);

            // amortização do mês = parcela - juros do mês atual
            repayments.push(installments[month] - interests[month]);

            // saldo devedor do mês = saldo devedor do mês anterior - amortização do mês atual
            debtByMonth.push(debtByMonth[month-1] - repayments[month]);
        }
        console.log(`Mês ${month}: J=${interests[month]}, A=${repayments[month]}, P=${installments[month]}, SD=${debtByMonth[month]}`);
    }

    if (d > 0) {
        
    }

    let table = document.querySelector("table");
    for (let month = 0; month <= t; month++) {
        let row = table.insertRow();
        let cell = row.insertCell();
        let text = document.createTextNode(month);
        cell.appendChild(text);

        cell = row.insertCell();
        text = document.createTextNode(interests[month].toFixed(2));
        cell.appendChild(text);

        cell = row.insertCell();
        text = document.createTextNode(repayments[month].toFixed(2));
        cell.appendChild(text);

        cell = row.insertCell();
        text = document.createTextNode(installments[month].toFixed(2));
        cell.appendChild(text);

        cell = row.insertCell();
        text = document.createTextNode(debtByMonth[month].toFixed(2));
        cell.appendChild(text);

    }

    let thead = table.createTHead();
    let row = thead.insertRow();

    let th = document.createElement("th");
    let text = document.createTextNode("Mês");
    th.appendChild(text);
    row.appendChild(th);

    th = document.createElement("th");
    text = document.createTextNode("Juros");
    th.appendChild(text);
    row.appendChild(th);

    th = document.createElement("th");
    text = document.createTextNode("Amortizações");
    th.appendChild(text);
    row.appendChild(th);

    th = document.createElement("th");
    text = document.createTextNode("Parcelas");
    th.appendChild(text);
    row.appendChild(th);

    th = document.createElement("th");
    text = document.createTextNode("Saldo Devedor");
    th.appendChild(text);
    row.appendChild(th);   

    /*result.innerHTML = `<div>Tabela Price</div><div>Principal Amount: <span>${p.toFixed(2)}</span></div> <div>Total Interest <span>${simpleInterest.
        toFixed(2)}</span></div><div>Total Amount: <span>${amount.toFixed(2)}</span></div>` */

    var theDiv = document.getElementById("result");
    var theElement = document.createElement("p")
    var content = document.createTextNode(`Prestação: \$${installment.toFixed(2)} ao mês`);
    theElement.appendChild(content);
    theDiv.appendChild(theElement);

    theElement = document.createElement("p")
    content = document.createTextNode(`Coeficiente de financiamento: ${(r/(1-Math.pow(1+r, -t))).toFixed(2)}`);
    theElement.appendChild(content);
    theDiv.appendChild(theElement);

    theElement = document.createElement("p")
    content = document.createTextNode(`Valor pago: \$${(installment * t).toFixed(2)}`);
    theElement.appendChild(content);
    theDiv.appendChild(theElement);


    if (d > 0) {
        theElement = document.createElement("p")
        content = document.createTextNode(`Meses a voltar: ${Math.ceil(d / installment)}`);
        theElement.appendChild(content);
        theDiv.appendChild(theElement);
    }
}

calculateBtn.addEventListener("click", calculate);
