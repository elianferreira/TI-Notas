let addTask = document.getElementById('btn-add-task');
let contentCad = document.getElementById('content-cad');
let closeBtnCad = document.getElementById('close-btn-cad');

addTask.addEventListener('click', () => {
  contentCad.classList.toggle('active');
});

closeBtnCad.addEventListener('click', () => {
  contentCad.classList.toggle('active');
});

/// Start crud firestore.

let editStatus = false;
let id = '';
let task;

let arrayDoc = [];

let tableContent = document.getElementById('table-content');
let taskForm = document.getElementById('taskForm');
let lista = document.getElementById('lista');

/**
 * Save a New Task in Firestore
 * @param {string} fornecedor
 * @param {string} whatThisIs para ver se é internet ou algum outro software
 * @param {string} conOc Ver se é contrato ou OC
 * @param {string} vencimento
 * @param {string} lancar
 * @param {string} emissao
 * @param {string} cobrar
 * @param {string} diasUteis
 * @param {string} projetos
 * @param {string} situacaoContrato
 * @param {string} rateio
 * @param {string} valor
 * @param {string} valor_anterior
 * @param {string} observacao
 */

const saveTask = (
  fornecedor,
  whatThisIs,
  conOc,
  vencimento,
  lancar,
  emissao,
  cobrar,
  diasUteis,
  projetos,
  situacaoContrato,
  rateio,
  valor,
  valor_anterior,
  observacao
) =>
  db.collection('tasks').doc().set({
    fornecedor,
    whatThisIs,
    conOc,
    vencimento,
    lancar,
    emissao,
    cobrar,
    diasUteis,
    projetos,
    situacaoContrato,
    rateio,
    valor,
    valor_anterior,
    observacao,
  });

const getTasks = () => db.collection('tasks').get();

const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback);

const deleteTask = (id) => db.collection('tasks').doc(id).delete();

const getTask = (id) => db.collection('tasks').doc(id).get();

const updateTask = (id, updatedTask) =>
  db.collection('tasks').doc(id).update(updatedTask);

window.addEventListener('DOMContentLoaded', async (e) => {
  onGetTasks((querySnapshot) => {
    tableContent.innerHTML = `<thead class="bg-gray-900">
    <tr>
      <th
        class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
      >
        Fornecedor
      </th>
      <th
        class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
      >
        Valor
      </th>
      <th
        class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
      >
        Vencimento
      </th>
      <th
        class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
      >
        Lançar até
      </th>
      <th
        class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
      >
        Cobrar Fornecedor
      </th>
      <th
        class="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left"
      >
        Observação
      </th>
    </tr>
  </thead>`;

    querySnapshot.forEach((doc) => {
      // const task = doc.data();

      task = doc.data();

      tableContent.innerHTML += `<tbody class="bg-white dark:bg-slate-800" id="t-body">
      <tr class="rounded">
        <td
          class="border-b border-t border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          ${task.fornecedor}
        </td>
        <td
        class="border-b border-t border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
      >
        ${task.valor}
      </td>
        <td
          class="border-b border-t border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
        ${task.vencimento}
        </td>
        <td
          class="border-b border-t border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
        ${task.lancar}
        </td>
        <td
          class="border-b border-t border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
        ${task.cobrar}
        </td>
        <td
          class="border-b border-t border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >
          ${task.observacao}
        </td>

        <td
          class="border-b border-t border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
        >

        <button
          type="submit"
          class="bg-slate-700 p-2 rounded text-slate-200 sm:text-sm hover:bg-slate-600 mr-5 btn-task-delete"
          data-id="${doc.id}"
        >
          Excluir
        </button>

          <button class="bg-slate-700 p-2 rounded text-slate-200 sm:text-sm hover:bg-slate-600 hover:text-slate-300 btn-editar" data-id="${doc.id}">
            Editar
          </button>

        </td>
      </tr>
      </tbody>`;
    });

    const btnsDelete = tableContent.querySelectorAll('.btn-task-delete');
    btnsDelete.forEach((btn) =>
      btn.addEventListener('click', async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tableContent.querySelectorAll('.btn-editar');
    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        contentCad.classList.toggle('active');

        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();

          taskForm['task-fornecedor'].value = task.fornecedor;
          taskForm['task-oque'].value = task.whatThisIs;
          taskForm['task-contrato'].value = task.conOc;
          taskForm['task-vencimento'].value = task.vencimento;
          taskForm['task-lancar'].value = task.lancar;
          taskForm['task-emissao'].value = task.emissao;
          taskForm['task-cobrar'].value = task.cobrar;
          taskForm['task-dias'].value = task.diasUteis;
          taskForm['task-projetos'].value = task.projetos;
          taskForm['task-situacao'].value = task.situacaoContrato;
          taskForm['task-rateio'].value = task.rateio;
          taskForm['task-valor'].value = task.valor;
          taskForm['task-valor_anterior'].value = task.valor_anterior;
          taskForm['task-observacao'].value = task.observacao;

          editStatus = true;
          id = doc.id;
          taskForm['btn-task-form'].innerText = 'Salvar alteração';
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const fornecedor = taskForm['task-fornecedor'];
  const whatThisIs = taskForm['task-oque'];
  const conOc = taskForm['task-contrato'];
  const vencimento = taskForm['task-vencimento'];
  const lancar = taskForm['task-lancar'];
  const emissao = taskForm['task-emissao'];
  const cobrar = taskForm['task-cobrar'];
  const diasUteis = taskForm['task-dias'];
  const projetos = taskForm['task-projetos'];
  const situacaoContrato = taskForm['task-situacao'];
  const rateio = taskForm['task-rateio'];
  const valor = taskForm['task-valor'];
  const valor_anterior = taskForm['task-valor_anterior'];
  const observacao = taskForm['task-observacao'];

  try {
    if (!editStatus) {
      await saveTask(
        fornecedor.value,
        whatThisIs.value,
        conOc.value,
        vencimento.value,
        lancar.value,
        emissao.value,
        cobrar.value,
        diasUteis.value,
        projetos.value,
        situacaoContrato.value,
        rateio.value,
        valor.value,
        valor_anterior.value,
        observacao.value
      );
    } else {
      await updateTask(id, {
        fornecedor: fornecedor.value,
        whatThisIs: whatThisIs.value,
        conOc: conOc.value,
        vencimento: vencimento.value,
        lancar: lancar.value,
        emissao: emissao.value,
        cobrar: cobrar.value,
        diasUteis: diasUteis.value,
        projetos: projetos.value,
        situacaoContrato: situacaoContrato.value,
        rateio: rateio.value,
        valor: valor.value,
        valor_anterior: valor_anterior.value,
        observacao: observacao.value,
      });

      editStatus = false;
      id = '';
      taskForm['btn-task-form'].innerText = 'Save';
    }

    taskForm.reset();
    // title.focus();
  } catch (error) {
    console.log(error);
  }
});

let search = document.getElementById('search');

function filter() {
  let rows = tableContent.rows;
  let value = search.value;

  for (let i = 0; i < rows.length; i++) {
    let element = rows[i];
    let find = false;
    for (let j = 0; j < element.cells.length; j++) {
      let text = element.cells[j].innerText;
      if (text.indexOf(value) != -1) {
        find = true;
        break;
      }
    }

    element.style.display = find ? 'table-row' : 'none';
  }
}

console.log('passou!');
