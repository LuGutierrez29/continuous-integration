var data;
var ActivePMateriaNumber = 1;
var PMateriaSize = 5;
var PMateriaTo;
var PMateriaFrom;
var rowCount;
var MaxId = 0;
var SuccessTime = 3000;
$(document).ready(function () {
    data = [
        { "id": 2, "Estudiante": "Wenonah", "Materia": "Matemáticas III", "Nota": 6 },
        { "id": 3, "Estudiante": "Murdock", "Notas": "Structural Engineer", "Nota": 3.3 }
        , { "id": 4, "Estudiante": "Reinhold", "Materia": "SQL", "Nota": 5.3 }
        , { "id": 5, "Estudiante": "Enoch", "Materia": "Developer III", "Nota": 3.9 }
        , { "id": 6, "Estudiante": "Bonita", "Materia": "Matemáticas", "Nota": 6.8 }
        , { "id": 7, "Estudiante": "Tod", "Materia": "Systems Administrator III", "Nota": 8.6 }
        , { "id": 8, "Estudiante": "Patrick", "Materia": "Matemáticas", "Nota": 4.7 }
        , { "id": 9, "Estudiante": "Layla", "Materia": "Assistant Professor", "Nota": 7 }
        , { "id": 10, "Estudiante": "Dee dee", "Materia": "Staff Accountant IV", "Nota": 1 }
        , { "id": 11, "Estudiante": "Luciano", "Materia": "Matemáticas", "Nota": 7.5 }
        , { "id": 12, "Estudiante": "Martainn", "Materia": "Mechanical Systems Engineer", "Nota": 1.1 }
        , { "id": 13, "Estudiante": "Grete", "Materia": "Automation Specialist I", "Nota": 5 }
        , { "id": 14, "Estudiante": "Roderick", "Materia": "Software I", "Nota": 7.3 }
        , { "id": 15, "Estudiante": "Obadias", "Materia": "Staff Accountant I", "Nota": 6.5 }
        , { "id": 16, "Estudiante": "Norri", "Materia": "Matemáticas", "Nota": 6 }
        , { "id": 17, "Estudiante": "Annecorinne", "Materia": "Teacher", "Nota": 4.7 }
        , { "id": 18, "Estudiante": "Vikki", "Materia": "Electrical Engineer", "Nota": 8.8 }
        , { "id": 19, "Estudiante": "Austin", "Materia": "Web Developer III", "Nota": 4.9 }
        , { "id": 20, "Estudiante": "Cindie", "Materia": "Staff Accountant III", "Nota": 1.9 }
    ];
    getByText();

});

function fncPagingClick(anchor) {
    $('#ulPagination .active').removeClass('active');
    $(anchor).parent().addClass('active');
    ActivePMateriaNumber = parseInt($(anchor).text());
    fnPagination(ActivePMateriaNumber);
}

function getIndexOf(el) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].id == el) {
            return i;
        }
    }
    return -1;
}

function Bind(myData) {
    $("#tblEstudiante tbody tr").remove();
    if (myData.length > 0) {
        $('#tblEstudiante tfoot').hide();
        $('#divPaging').show();

        $.each(myData, function (key, val) {
            var tr = $('<tr></tr>');
            var id;
            $.each(val, function (k, v) {
                if (k != 'id') {
                    $('<td>' + v + '</td>').appendTo(tr);
                }
                else {
                    id = v;
                    MaxId = Math.max(id, MaxId);
                }
            });
            $('<td><a href="#editEstudianteModal" onclick="fncEdit(\'' + id + '\')" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Edit"></i></a><a href="#deleteEstudianteModal' + id + '" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="" data-original-title="Delete"></i></a><div id="deleteEstudianteModal' + id + '" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Delete Estudiante</h4><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>                     </div>                     <div class="modal-body">                                             <p>¿Estás seguro de que quieres eliminar este registro?</p>                         <p class="text-warning"><small>Esta acción no puede ser regresada.</small></p></div><div class="modal-footer"><input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"><input type="button" class="btn btn-danger" onclick="fncDelete(\'' + id + '\')" value="Delete"> </div> </div></div> </div></td>').appendTo(tr);
            tr.appendTo('#tblEstudiante tbody');
        });
        rowCount = $('#tblEstudiante >tbody >tr').length;
        fnPagination(ActivePMateriaNumber);
        var PMateria = Math.ceil(parseInt(rowCount) / PMateriaSize);
        $("#bTotal").text(rowCount);
        if (PMateria > 0) {
            $("#ulPagination li").remove();
            for (var i = 1; i <= PMateria; i++) {
                var ul = $('#ulPagination');
                $('<li class="pMateria-item ' + ((i == ActivePMateriaNumber) ? "active" : "") + '"><a href="javascript:void(0)" onclick="fncPagingClick(this)" class="pMateria-link">' + i + '</a></li>').appendTo(ul);
            }
        }
    }
    else {
        $('#tblEstudiante tfoot').show();
        $('#divPaging').hide();
    }
}

function fnPagination(num) {
    PMateriaFrom = ((num - 1) * PMateriaSize);
    PMateriaTo = PMateriaFrom + PMateriaSize;
    PMateriaTo = (PMateriaTo > rowCount) ? rowCount : PMateriaTo;
    $("#bFrom").text((PMateriaFrom + 1));
    $("#bTo").text(PMateriaTo);
    $("#tblEstudiante tbody tr").hide();
    $('#tblEstudiante tr:gt(' + (PMateriaFrom) + '):lt(' + PMateriaSize + ')').show(100);
}

function onlyNumbers(evt) {
    var evtobj = window.event ? event : evt;
    var charCode = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;
    if (charCode > 47 && charCode < 58 || charCode == 43 || charCode == 45 || charCode == 32 || charCode == 8 || charCode == 9 || charCode == 2 || charCode == 3 || charCode == 14 || charCode == 15 || charCode == 46 || charCode == 36 || charCode == 35)
        return true;
    else
        return false;
}

function showMessMateria(msg) {
    $(".myAlert-top").show(800);
    $("#spnMsg").text(msg);
    setTimeout(function () {
        $(".myAlert-top").hide(800);
    }, SuccessTime);
}

function getByText() {
    var txt = $('#txtSearch').val();
    if (txt != null && txt != 'undefined' && txt.trim() != '') {
        var search = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].Estudiante.toLowerCase().includes(txt.toLowerCase()) || txt.toLowerCase().includes(data[i].Estudiante.toLowerCase()) || data[i].Notas.toLowerCase().includes(txt.toLowerCase()) || txt.toLowerCase().includes(data[i].Notas.toLowerCase())) {
                search.unshift(data[i])
            }
        }
        Bind(search);
    }
    else {
        Bind(data);
    }
}

function BindEnter(event) {
    if (event.which == 13 || event.keyCode == 13) {
        getByText();
    }
}

function fncUpdate(index) {
    event.preventDefault();
    data[index].Estudiante = $('#txtEditEstudiante').val();
    data[index].Notas = $('#txtEditNotas').val();
    data[index].Materia = $('#txtEditMateria').val();
    $('#editEstudianteModal').modal('toggle');
    $('#editEstudianteModal input:text').val('');
    showMessMateria('row updated successfully.');
    getByText();
}

function fncEdit(id) {
    var index = getIndexOf(id);
    if (index > -1) {
        $('#txtEditEstudiante').val(data[index].Estudiante);
        $('#txtEditNotas').val(data[index].Notas);
        $('#txtEditMateria').val(data[index].Materia);
        $('#editform').attr('onSubmit', 'fncUpdate(\'' + index + '\')');
    }
}

function fncAdd() {
    event.preventDefault();
    if ($("#txtEstudiante").val().length > 0) {
        data.unshift(
            { "id": (MaxId + 1), "Estudiante": $('#txtEstudiante').val(), "Notas": $('#txtNotas').val(), "Materia": $('#txtMateria').val() }
        );
        ActivePMateriaNumber = 1;
        $('#addEstudianteModal').modal('toggle');
        $('#addEstudianteModal input:text').val('');
        showMessMateria('row added successfully.');
        getByText();
    }
}

function fncDelete(val, modal) {
    event.preventDefault();
    var index = getIndexOf(val);
    if (index > -1) {
        data.splice(index, 1);
        $('#deleteEstudianteModal' + val).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        showMessMateria('row deleted successfully.');
        getByText();
    }
}