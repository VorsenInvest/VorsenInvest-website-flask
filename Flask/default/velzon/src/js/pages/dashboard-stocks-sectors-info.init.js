$(document).ready(function() {
    // Your existing code...
    // ...

    // Event handler for each dropdown item
    $(".dropdown-menu a.dropdown-item").on('click', function() {
        // Get the text of the clicked item
        var selectedText = $(this).text();

        // Set the button text to the selected item's text
        $(this).closest('.btn-group').find('.dropdown-toggle').text(selectedText);

        // Check if the selected text is "Ações"
        if (selectedText === "Ações") {
            // Change the class of the target button
            // Ensure to use the correct selector for your target button
            $("#stockButton").removeClass('btn-light').addClass('btn-success');
            
        }
    });


    
    



    // Check if the DataTable instance already exists
    if (!$.fn.DataTable.isDataTable('#stock-ind-fund')) {
        var table = $('#stock-ind-fund').DataTable({
            // DataTables configuration options
        });
    } else {
        // If it already exists, retrieve the existing instance
        var table = $('#stock-ind-fund').DataTable();
    }

    // Event listener for Subsector Dropdown (assuming multiple selections are possible)
    $('.subsector-option-fund').change(function() {
        var selectedSubsectors = $('.subsector-option-fund:checked').map(function() {
            return $(this).data('value');
        }).get();
        var subsectorFilter = selectedSubsectors.join('|');
        table.column(2).search(subsectorFilter, true, false).draw();
    });

    // Event listener for Segment Dropdown (assuming multiple selections are possible)
    $('.segment-option-fund').change(function() {
        var selectedSegments = $('.segment-option-fund:checked').map(function() {
            return $(this).data('value');
        }).get();
        var segmentFilter = selectedSegments.join('|');
        table.column(3).search(segmentFilter, true, false).draw();
    });

    
    // Event listener for Economic Sector Dropdown
    $('.economicSector-option-fund').change(function() {
        var selectedSectors = $('.economicSector-option-fund:checked').map(function() {
            return $(this).data('value');
        }).get();
        var economicSectorFilter = selectedSectors.join('|');
        table.column(1).search(economicSectorFilter, true, false).draw();
    });

    // Event listener for "Select All" Subsector
    $('#selectAllSubsectors').change(function() {
        var selected = $(this).prop('checked');
        $('.subsector-option-fund').prop('checked', selected).trigger('change');
    });

    // Event listener for "Select All" Segment
    $('#selectAllSegments').change(function() {
        var selected = $(this).prop('checked');
        $('.segment-option-fund').prop('checked', selected).trigger('change');
    });

    // Event listener for "Select All" Economic Sectors
    $('#selectAllEconomicSectors').change(function() {
        var selected = $(this).prop('checked');
        $('.economicSector-option-fund').prop('checked', selected).trigger('change');
    });

    // Subsector
    $('#selectAll').change(function() {
        $('.subsector-option-fund').prop('checked', this.checked);
    });

    $('.subsector-option-fund').change(function() {
        updateSelectAllState(this, '.subsector-option-fund', '#selectAll');
    });

    // Segment
    $('#selectAllSegments').change(function() {
        $('.segment-option-fund').prop('checked', this.checked);
    });

    $('.segment-option-fund').change(function() {
        updateSelectAllState(this, '.segment-option-fund', '#selectAllSegments');
    });

    // Economic Sector
    $('#selectAllEconomicSectors').change(function() {
        $('.economicSector-option-fund').prop('checked', this.checked);
    });

    $('.economicSector-option-fund').change(function() {
        updateSelectAllState(this, '.economicSector-option-fund', '#selectAllEconomicSectors');
    });

    function updateSelectAllState(checkbox, optionClass, selectAllId) {
        if (!checkbox.checked) {
            $(selectAllId).prop('checked', false);
        } else {
            var allChecked = $(optionClass).length === $(optionClass + ':checked').length;
            $(selectAllId).prop('checked', allChecked);
        }
    }

    // Re-calculate and update counts when data changes
    table.on('draw', function() {
        updateUniqueCounts();
    });

});





