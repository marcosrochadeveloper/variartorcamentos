    const materiais = {

        "avery": { "ar": 35.00, "gf": 32.00, "verniz": true, "recorte": true, "complemento": "do Vinil Avery"},

        "blackout": { "ar": 35.00, "gf": 32.00, "verniz": true, "recorte": true, "complemento": "do Vinil Blackout"},

        "fosco": { "ar": 35.00, "gf": 32.00, "verniz": true, "recorte": true, "complemento": "do Vinil Fosco"},

        "perfurado": { "gf": 35.00, "ar": false, "tab3": 120.00, "verniz": false, "recorte": false, "complemento": "do Vinil Perfurado"},

        "promocional": { "ar": 120.00, "gf": 120.00, "tab3": 120.00, "verniz": false, "recorte": false, "complemento": "do Vinil Promocional"},

        "transparente": { "ar": 76.00, "gf": 76.00, "tab3": 76.00, "verniz": false, "recorte": true, "complemento": "do Vinil Transparente"},

        "lona440": { "tab1": 75.00, "tab2": 65.00, "tab3": 60.00, "verniz": true, "recorte": false, "complemento": "da Lona 440g"},

        "outdoor": { "tab1": 33.00, "tab2": 33.00, "tab3": 33.00, "verniz": false, "recorte": false, "complemento": "do Papel Outdoor"},

        "acabamentos": { "recorte": 10.00, "verniz": 14.00, "bannerate70cm": 8.00, "bannerate120cm": 10.00, "bannerate145cm": 12.00, "bannerate200cm": 20.00}
        
    };

    function valores(){
        let material = document.querySelector("#material_opt").value;
        let verniz = document.querySelector("#boxverniz");
        let recorte = document.querySelector("#boxrecorte");
        let semacabamentos = document.querySelector("#semacabamentos");
        let comverniz = document.querySelector("#verniz");
        let comrecorte = document.querySelector("#recorte");
    }

    function acabamento(){
        valores();
    }

    function acabamento(){
        let material = document.querySelector("#material_opt").value;
        let verniz = document.querySelector("#boxverniz");
        let recorte = document.querySelector("#boxrecorte");
        let semacabamentos = document.querySelector("#semacabamentos");
        let comverniz = document.querySelector("#verniz");
        let comrecorte = document.querySelector("#recorte");

        let permiteverniz = materiais[material].verniz;
        let permiterecorte = materiais[material].recorte;

        verniz.style.display = permiteverniz ? "grid" : "none";
        recorte.style.display = permiterecorte ? "grid" : "none";

        semacabamentos.style.display = (permiteverniz || permiterecorte) ? "none" : "grid";

        //SE !(NÃO)permite verniz (seleção do "comverniz" muda para não selecionado)
        if(!permiteverniz) comverniz.checked = false;
        if(!permiterecorte) comrecorte.checked = false;

    }
    function calcular(){
        let material = document.querySelector("#material_opt").value;
        let verniz = document.querySelector("#boxverniz");
        let recorte = document.querySelector("#boxrecorte");
        let resultado = document.querySelector("#resultado");
        let quantidade = document.querySelector("#quantidade").value;
        let altura = document.querySelector("#altura").value / 100;
        let largura = document.querySelector("#largura").value / 100;
        let comverniz = document.querySelector("#verniz").checked;
        let comrecorte = document.querySelector("#recorte").checked;
        let complemento = materiais[material].complemento;
        let uni = "unidade";
        let fica = "custa";
        let m2unitario = altura*largura;
        let m2total = m2unitario*quantidade;
        let precom2 = 0;

        if (m2total >= 1){
            precom2 = materiais[material].tab3;
        } else if(m2total >= 0.5){
            precom2 = materiais[material].tab2;
        } else{
            precom2 = materiais[material].tab1;
        }

        if (comverniz){
            complemento += ` envernizado`;
            verniz.style.background = "green";
            verniz.style.color = "white";
            precom2 += 15;
        } else {
            verniz.style.background = "darkred";
            verniz.style.color = "white";
        }

        if (comrecorte){
            recorte.style.background = "green";
            recorte.style.color = "white";
            if (m2total >= 1){
                precom2 = materiais["acabamentos"].recorte3;
            } else if(m2total >= 0.5){
                precom2 = materiais["acabamentos"].recorte2;
            } else{
                precom2 = materiais["acabamentos"].recorte1;
            }
            if(comverniz){
                complemento += ` e recortado`;
                precom2 += 15;
            } else{
                complemento += ` recortado`
            }

        } else{
            recorte.style.background = "darkred";
            recorte.style.color = "white";
        }



        let total = quantidade * (altura*largura) * precom2;

        if(material == "outdoor" && m2total < 1){
            total = 33;
        }

        if(quantidade != 1){
            uni = "unidades";
            fica = "custam";
        }

        resultado.innerHTML = `<textarea>${quantidade} ${uni} ${complemento} no tamanho de ${altura*100}x${largura*100}cm ${fica} R$${total.toFixed(2)}</textarea>`;
    }

document.addEventListener("DOMContentLoaded", () => {
    const material = document.getElementById("material_opt");
    const verniz = document.getElementById("verniz");
    const recorte = document.getElementById("recorte");
    const quantidade = document.getElementById("quantidade");
    const altura = document.getElementById("altura");
    const largura = document.getElementById("largura");

    material.addEventListener("change", () => { acabamento(); calcular(); });
    verniz.addEventListener("change", calcular);
    recorte.addEventListener("change", calcular);
    quantidade.addEventListener("input", calcular);
    altura.addEventListener("input", calcular);
    largura.addEventListener("input", calcular);

  // primeira renderização
    acabamento();
    calcular();
});