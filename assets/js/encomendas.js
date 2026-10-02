/* =====================================================
   ENCOMENDAS
===================================================== */


/*
=========================================================
BANCO DE ENCOMENDAS
=========================================================
*/

let encomendas =
    JSON.parse(
        localStorage.getItem(
            "encomendasSistema"
        )
    ) || [];


/*
=========================================================
SALVAR
=========================================================
*/

function salvarEncomendasLocalStorage() {

    localStorage.setItem(

        "encomendasSistema",

        JSON.stringify(
            encomendas
        )

    );

}


/*
=========================================================
ABRIR MODAL
=========================================================
*/

function abrirModalEncomenda(
    id = null
) {

    const modal =
        document.getElementById(
            "modalEncomenda"
        );


    const titulo =
        document.getElementById(
            "modalEncomendaTitulo"
        );


    if (!modal) {
        return;
    }


    carregarProdutosEncomenda();


    /*
    ============================================
    NOVA
    ============================================
    */

    if (!id) {

        document
            .getElementById(
                "formEncomenda"
            )
            .reset();


        document
            .getElementById(
                "encomendaId"
            )
            .value = "";


        document
            .getElementById(
                "encomendaQuantidade"
            )
            .value = 1;


        titulo.textContent =
            "Nova Encomenda";


        atualizarValorEncomenda();

    }


    /*
    ============================================
    EDITAR
    ============================================
    */

    else {

        const encomenda =
            encomendas.find(
                item =>
                    item.id === id
            );


        if (!encomenda) {
            return;
        }


        document
            .getElementById(
                "encomendaId"
            )
            .value =
                encomenda.id;


        document
            .getElementById(
                "encomendaProduto"
            )
            .value =
                encomenda.produto;


        document
            .getElementById(
                "encomendaQuantidade"
            )
            .value =
                encomenda.quantidade;


        document
            .getElementById(
                "encomendaTipo"
            )
            .value =
                encomenda.tipo;


        document
            .getElementById(
                "encomendaCliente"
            )
            .value =
                encomenda.cliente || "";


        document
            .getElementById(
                "encomendaObservacoes"
            )
            .value =
                encomenda.observacoes || "";


        titulo.textContent =
            "Editar Encomenda";


        atualizarValorEncomenda();

    }


    modal.classList.remove(
        "hidden"
    );

}


/*
=========================================================
FECHAR
=========================================================
*/

function fecharModalEncomenda() {

    const modal =
        document.getElementById(
            "modalEncomenda"
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "hidden"
    );

}


/*
=========================================================
CARREGAR PRODUTOS DO CRAFT
=========================================================
*/

function carregarProdutosEncomenda() {

    const select =
        document.getElementById(
            "encomendaProduto"
        );


    if (!select) {
        return;
    }


    const valorAtual =
        select.value;


    select.innerHTML = `

        <option value="">
            Selecione um produto
        </option>

    `;


    /*
    Usa diretamente as receitas
    salvas no Craft.
    */

    for (
        const chave in receitas
    ) {

        const receita =
            receitas[chave];


        const option =
            document.createElement(
                "option"
            );


        option.value =
            chave;


        option.textContent =
            receita.nome;


        select.appendChild(
            option
        );

    }


    if (valorAtual) {

        select.value =
            valorAtual;

    }

}


/*
=========================================================
ATUALIZAR VALOR
=========================================================
*/

function atualizarValorEncomenda() {

    const produto =
        document.getElementById(
            "encomendaProduto"
        )?.value;


    const quantidade =
        Number(
            document.getElementById(
                "encomendaQuantidade"
            )?.value
        ) || 0;


    const tipo =
        document.getElementById(
            "encomendaTipo"
        )?.value;


    const preview =
        document.getElementById(
            "valorEncomendaPreview"
        );


    if (!preview) {
        return;
    }


    if (!produto) {

        preview.innerHTML =
            "Selecione um produto.";

        return;

    }


    const receita =
        receitas[produto];


    if (!receita) {

        preview.innerHTML =
            "Produto não encontrado.";

        return;

    }


    /*
    Preços salvos na receita
    */

    const precos =
        receita.precos || {};


    const valorUnitario =
        Number(
            precos[tipo]
        ) || 0;


    const valorTotal =
        valorUnitario *
        quantidade;


    if (valorUnitario <= 0) {

        preview.innerHTML = `

            <strong>
                ${receita.nome}
            </strong>

            <br>

            Este produto não possui
            preço cadastrado para
            <strong>${tipo}</strong>.

        `;

        return;

    }


    preview.innerHTML = `

        <strong>
            ${receita.nome}
        </strong>

        <br>

        ${formatarDinheiro(
            valorUnitario
        )}

        por unidade

        ×

        ${formatarNumero(
            quantidade
        )}

        unidades

        <br>

        Total:

        <strong>
            ${formatarDinheiro(
                valorTotal
            )}
        </strong>

    `;

}


/*
=========================================================
SALVAR ENCOMENDA
=========================================================
*/

function salvarEncomenda(event) {

    event.preventDefault();


    const id =
        document
            .getElementById(
                "encomendaId"
            )
            .value;


    const produto =
        document
            .getElementById(
                "encomendaProduto"
            )
            .value;


    const quantidade =
        Number(
            document
                .getElementById(
                    "encomendaQuantidade"
                )
                .value
        );


    const tipo =
        document
            .getElementById(
                "encomendaTipo"
            )
            .value;


    const cliente =
        document
            .getElementById(
                "encomendaCliente"
            )
            .value
            .trim();


    const observacoes =
        document
            .getElementById(
                "encomendaObservacoes"
            )
            .value
            .trim();


    /*
    ============================================
    VALIDAÇÃO
    ============================================
    */

    if (!produto) {

        alert(
            "Selecione um produto."
        );

        return;

    }


    if (
        !quantidade ||
        quantidade <= 0
    ) {

        alert(
            "Digite uma quantidade válida."
        );

        return;

    }


    const receita =
        receitas[produto];


    if (!receita) {

        alert(
            "A receita desse produto não existe."
        );

        return;

    }


    const precos =
        receita.precos || {};


    const valorUnitario =
        Number(
            precos[tipo]
        ) || 0;


    const valorTotal =
        valorUnitario *
        quantidade;


    /*
    ============================================
    EDITAR
    ============================================
    */

    if (id) {

        const indice =
            encomendas.findIndex(
                item =>
                    item.id === id
            );


        if (indice === -1) {
            return;
        }


        /*
        Mantém o status original.
        */

        encomendas[indice] = {

            ...encomendas[indice],

            produto,

            nomeProduto:
                receita.nome,

            quantidade,

            tipo,

            cliente,

            valorUnitario,

            valorTotal,

            observacoes,

            atualizadoEm:
                new Date().toISOString()

        };

    }


    /*
    ============================================
    NOVA
    ============================================
    */

    else {

        const novaEncomenda = {

            id:
                Date.now().toString(),

            produto,

            nomeProduto:
                receita.nome,

            quantidade,

            tipo,

            cliente,

            valorUnitario,

            valorTotal,

            observacoes,

            status:
                "Pendente",

            criadaEm:
                new Date().toISOString(),

            concluidaEm:
                null

        };


        encomendas.push(
            novaEncomenda
        );

    }


    salvarEncomendasLocalStorage();


    mostrarEncomendas();


    fecharModalEncomenda();


    alert(
        id
            ? "Encomenda atualizada!"
            : "Encomenda criada!"
    );

}


/*
=========================================================
MOSTRAR ENCOMENDAS
=========================================================
*/

function mostrarEncomendas() {

    const container =
        document.getElementById(
            "listaEncomendas"
        );


    const vazio =
        document.getElementById(
            "encomendasVazio"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    /*
    ============================================
    FILTROS
    ============================================
    */

    const pesquisa =
        (
            document
                .getElementById(
                    "pesquisaEncomenda"
                )?.value || ""
        )
            .toLowerCase()
            .trim();


    const produtoFiltro =
        document
            .getElementById(
                "filtroProdutoEncomenda"
            )?.value || "";


    const statusFiltro =
        document
            .getElementById(
                "filtroStatusEncomenda"
            )?.value || "";


    /*
    ============================================
    FILTRA
    ============================================
    */

    const lista =
        encomendas.filter(
            encomenda => {

                const textoPesquisa = `

                    ${encomenda.nomeProduto}

                    ${encomenda.cliente || ""}

                `
                    .toLowerCase();


                const correspondePesquisa =

                    !pesquisa ||

                    textoPesquisa.includes(
                        pesquisa
                    );


                const correspondeProduto =

                    !produtoFiltro ||

                    encomenda.produto ===
                        produtoFiltro;


                const correspondeStatus =

                    !statusFiltro ||

                    encomenda.status ===
                        statusFiltro;


                return (

                    correspondePesquisa &&

                    correspondeProduto &&

                    correspondeStatus

                );

            }
        );


    /*
    ============================================
    VAZIO
    ============================================
    */

    if (lista.length === 0) {

        vazio?.classList.remove(
            "hidden"
        );

    }

    else {

        vazio?.classList.add(
            "hidden"
        );

    }


    /*
    ============================================
    CARDS
    ============================================
    */

    lista.forEach(
        encomenda => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "encomenda-card";


            const statusClasse =
                encomenda.status ===
                    "Concluída"

                    ? "concluida"

                    : "pendente";


            const data =
                encomenda.criadaEm

                    ? new Date(
                        encomenda.criadaEm
                    ).toLocaleDateString(
                        "pt-BR"
                    )

                    : "-";


            const cliente =
                encomenda.cliente ||
                "Não informado";


            const observacoes =
                encomenda.observacoes
                    ? `

                        <div
                            class="
                                encomenda-observacoes
                            "
                        >

                            ${escaparHTML(
                                encomenda.observacoes
                            )}

                        </div>

                    `
                    : "";


            card.innerHTML = `

                <div
                    class="
                        encomenda-card-header
                    "
                >

                    <div>

                        <h3>
                            Encomenda
                        </h3>

                        <span
                            class="
                                encomenda-id
                            "
                        >
                            #${encomenda.id}
                        </span>

                    </div>


                    <span
                        class="
                            encomenda-status
                            ${statusClasse}
                        "
                    >

                        ${
                            encomenda.status ===
                            "Concluída"

                                ? "✓ Concluída"

                                : "● Pendente"

                        }

                    </span>

                </div>


                <div
                    class="
                        encomenda-produto
                    "
                >

                    <span>
                        Produto
                    </span>

                    <strong>
                        ${escaparHTML(
                            encomenda.nomeProduto
                        )}
                    </strong>

                </div>


                <div
                    class="
                        encomenda-info
                    "
                >

                    <div
                        class="
                            encomenda-info-row
                        "
                    >

                        <span>
                            Quantidade
                        </span>

                        <span>
                            ${formatarNumero(
                                encomenda.quantidade
                            )}
                        </span>

                    </div>


                    <div
                        class="
                            encomenda-info-row
                        "
                    >

                        <span>
                            Cliente
                        </span>

                        <span>
                            ${escaparHTML(
                                cliente
                            )}
                        </span>

                    </div>


                    <div
                        class="
                            encomenda-info-row
                        "
                    >

                        <span>
                            Tipo
                        </span>

                        <span>
                            ${encomenda.tipo}
                        </span>

                    </div>


                    <div
                        class="
                            encomenda-info-row
                        "
                    >

                        <span>
                            Criada em
                        </span>

                        <span>
                            ${data}
                        </span>

                    </div>

                </div>


                <div
                    class="
                        encomenda-valor
                    "
                >

                    <small>
                        Valor da encomenda
                    </small>

                    <strong>
                        ${formatarDinheiro(
                            encomenda.valorTotal
                        )}
                    </strong>

                </div>


                ${observacoes}


                <div
                    class="
                        encomenda-actions
                    "
                >

                    ${
                        encomenda.status ===
                        "Pendente"

                            ? `

                                <button
                                    type="button"
                                    class="
                                        btn-concluir-encomenda
                                    "
                                    onclick="
                                        concluirEncomenda(
                                            '${encomenda.id}'
                                        )
                                    "
                                >
                                    ✓ Concluir
                                </button>

                            `

                            : `

                                <button
                                    type="button"
                                    class="
                                        btn-reabrir-encomenda
                                    "
                                    onclick="
                                        reabrirEncomenda(
                                            '${encomenda.id}'
                                        )
                                    "
                                >
                                    ↩ Reabrir
                                </button>

                            `
                    }


                    <button
                        type="button"
                        class="
                            btn-editar-encomenda
                        "
                        onclick="
                            abrirModalEncomenda(
                                '${encomenda.id}'
                            )
                        "
                    >
                        ✏ Editar
                    </button>


                    <button
                        type="button"
                        class="
                            btn-excluir-encomenda
                        "
                        onclick="
                            excluirEncomenda(
                                '${encomenda.id}'
                            )
                        "
                    >
                        🗑 Excluir
                    </button>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );


    atualizarEstatisticasEncomendas();

}


/*
=========================================================
CONCLUIR
=========================================================
*/

function concluirEncomenda(id) {

    const encomenda =
        encomendas.find(
            item =>
                item.id === id
        );


    if (!encomenda) {
        return;
    }


    const confirmar =
        confirm(
            `Marcar a encomenda de "${encomenda.nomeProduto}" como concluída?`
        );


    if (!confirmar) {
        return;
    }


    encomenda.status =
        "Concluída";


    encomenda.concluidaEm =
        new Date().toISOString();


    salvarEncomendasLocalStorage();


    mostrarEncomendas();

}


/*
=========================================================
REABRIR
=========================================================
*/

function reabrirEncomenda(id) {

    const encomenda =
        encomendas.find(
            item =>
                item.id === id
        );


    if (!encomenda) {
        return;
    }


    encomenda.status =
        "Pendente";


    encomenda.concluidaEm =
        null;


    salvarEncomendasLocalStorage();


    mostrarEncomendas();

}


/*
=========================================================
EXCLUIR
=========================================================
*/

function excluirEncomenda(id) {

    const encomenda =
        encomendas.find(
            item =>
                item.id === id
        );


    if (!encomenda) {
        return;
    }


    const confirmar =
        confirm(
            `Deseja excluir esta encomenda?`
        );


    if (!confirmar) {
        return;
    }


    encomendas =
        encomendas.filter(
            item =>
                item.id !== id
        );


    salvarEncomendasLocalStorage();


    mostrarEncomendas();

}


/*
=========================================================
FILTRO DE PRODUTOS
=========================================================
*/

function carregarFiltroProdutosEncomenda() {

    const select =
        document.getElementById(
            "filtroProdutoEncomenda"
        );


    if (!select) {
        return;
    }


    const valorAtual =
        select.value;


    select.innerHTML = `

        <option value="">
            Todos os produtos
        </option>

    `;


    for (
        const chave in receitas
    ) {

        const receita =
            receitas[chave];


        const option =
            document.createElement(
                "option"
            );


        option.value =
            chave;


        option.textContent =
            receita.nome;


        select.appendChild(
            option
        );

    }


    select.value =
        valorAtual;

}


/*
=========================================================
ESTATÍSTICAS
=========================================================
*/

function atualizarEstatisticasEncomendas() {

    const total =
        encomendas.length;


    const pendentes =
        encomendas.filter(
            item =>
                item.status ===
                "Pendente"
        ).length;


    const concluidas =
        encomendas.filter(
            item =>
                item.status ===
                "Concluída"
        ).length;


    document
        .getElementById(
            "totalEncomendas"
        )
        ?.replaceChildren(
            document.createTextNode(
                total
            )
        );


    document
        .getElementById(
            "encomendasPendentes"
        )
        ?.replaceChildren(
            document.createTextNode(
                pendentes
            )
        );


    document
        .getElementById(
            "encomendasConcluidas"
        )
        ?.replaceChildren(
            document.createTextNode(
                concluidas
            )
        );

}


/*
=========================================================
ESCAPAR HTML
=========================================================
*/

function escaparHTML(texto) {

    return String(texto)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/*
=========================================================
INICIALIZAÇÃO
=========================================================
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarProdutosEncomenda();

        carregarFiltroProdutosEncomenda();

        mostrarEncomendas();

    }
);