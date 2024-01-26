/*
Template Name: Velzon - Admin & Dashboard Template
Author: Themesbrand
Website: https://Themesbrand.com/
Contact: Themesbrand@gmail.com
File: datatables init js
*/

function initializeTables() {
    let example = new DataTable('#example',);

    let stockList = new DataTable('#stock-list', {
        "scrollY": "420px",
        "scrollCollapse": true,
        "paging": false,
        "searching": true  // This line enables search functionality
    });

    let stockIndicators = new DataTable('#stock-ind-fund', {
        "scrollY": "420px",
        "scrollCollapse": true,
        "paging": false,
        "scrooX": true,
        "searching": true  // This line enables search functionality
    });

    let sectorList = new DataTable('#sector-list',);
    let subsectorList = new DataTable('#subsector-list',);
    let segmentList = new DataTable('#segment-list',);

    let scrollVertical = new DataTable('#scroll-vertical', {
        "scrollY": "210px",
        "scrollCollapse": true,
        "paging": false
    });

    let scrollHorizontal = new DataTable('#scroll-horizontal', {
        "scrollX": true
    });

    let alternativePagination = new DataTable('#alternative-pagination', {
        "pagingType": "full_numbers"
    });

    //fixed header
    let fixedHeader = new DataTable('#fixed-header', {
        "fixedHeader": true
    });

    //modal data data tables
    let modelDataTables = new DataTable('#model-datatables', {
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal({
                    header: function (row) {
                        var data = row.data();
                        return 'Details for ' + data[0] + ' ' + data[1];
                    }
                }),
                renderer: $.fn.dataTable.Responsive.renderer.tableAll({
                    tableClass: 'table'
                })
            }
        }
    });

    //buttons examples
    let buttonsDataTables = new DataTable('#buttons-datatables', {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'print', 'pdf'
        ]
    });

    //buttons examples
    let ajaxDataTables = new DataTable('#ajax-datatables', {
        "ajax": '/static/json/datatable.json'
    });

    let sectorDataTables = new DataTable('#sector-datatables', {
        "ajax": '/apps/sectors/list'
    });
    

    var t = $('#add-rows').DataTable();
    var counter = 1;

    $('#addRow').on('click', function () {
        t.row.add([
            counter + '.1',
            counter + '.2',
            counter + '.3',
            counter + '.4',
            counter + '.5',
            counter + '.6',
            counter + '.7',
            counter + '.8',
            counter + '.9',
            counter + '.10',
            counter + '.11',
            counter + '.12'
        ]).draw(false);

        counter++;
    });

    // Automatically add a first row of data
    $('#addRow').trigger('click');
}

document.addEventListener('DOMContentLoaded', function () {
    initializeTables();
});
