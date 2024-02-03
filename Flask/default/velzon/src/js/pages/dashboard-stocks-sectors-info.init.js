$(document).ready(function() {
    // Your existing code...
    // ...

    var stockOptionSelected; // Initialize a flag for stockOption selection
    var selectedText = ''; // Initialize the selectedText variable
    
    $(".dropdown-menu a.dropdown-item").on('click', function() {
        selectedText = $(this).text().trim(); // Update selectedText when an item is clicked
        $(this).closest('.btn-group').find('.dropdown-toggle').text(selectedText);
    
        console.log("Selected Text:", selectedText); // Debug line
    
        // Assuming table_data_fund is available as a global JavaScript variable
        var quickRatio = getQuickRatioForSymbol(selectedText, table_data_fund);
    
        console.log("Quick Ratio:", quickRatio); // Debug line
    
        // Update the div with the quickRatio value only if both stockOption and selectedText are selected
        if (stockOptionSelected && selectedText) {
            $('#quickRatioDisplay').text(quickRatio !== null ? quickRatio : 'Not Available');
        } else {
            $('#quickRatioDisplay').text('');
        }
    });
    
    // Add an event handler for stockOption selection
    $('#stocksOption').click(function() {
        stockOptionSelected = true; // Set stockOptionSelected to true when stockOption is clicked
    
        if (stockOptionSelected && selectedText) {
            // If both stockOption and selectedText are selected, update the div with quickRatio
            var quickRatio = getQuickRatioForSymbol(selectedText, table_data_fund);
            $('#quickRatioDisplay').text(quickRatio !== null ? quickRatio : 'Not Available');
        } else {
            $('#quickRatioDisplay').text('');
        }
    });
    
    
    

    // Function to search for the quickRatio by symbol
    function getQuickRatioForSymbol(symbol, data) {
        var item = data.find(item => item.symbol === symbol);
        return item ? item.quickRatio : null;
    }

    var mapping = {
        'stocksOption': '#stockButton',
        'segmentsOption': '#segmentButton', // Adjusted the ID here to match the pattern
        'subsectorsOption': '#subsectorButton',
        'economicSectorsOption': '#economicSectorButton',
        'stockExchangeOption': '#stockExchangeButton' // Assuming you have a button for Bovespa
    };
    
    // Iterate over each mapping entry
    $.each(mapping, function(listItemId, buttonId) {
        // Convert list items to buttons if not already done in HTML. Assuming conversion is done, this step can be ignored in HTML
        // Add click event listener to each button that represents the list item
        $('#' + listItemId).click(function() {
            // Reset all list item buttons to be clickable and remove btn-success class, applying btn-light for visual consistency if needed
            $.each(mapping, function(liId, _) {
                $('#' + liId).prop('disabled', false).removeClass('btn-success'); // Optionally add .addClass('btn-light') if you're using btn-light class for other list items
            });
    
            // Make the clicked list item button unclickable and add btn-success class
            $(this).prop('disabled', true).addClass('btn-success');
    
            // First, reset all associated buttons to be not clickable and btn-light
            $.each(mapping, function(_, btnId) {
                $(btnId).prop('disabled', true).removeClass('btn-success').addClass('btn-light');
            });
    
            // Then, make the respective button clickable and btn-success
            $(buttonId).prop('disabled', false).removeClass('btn-light').addClass('btn-success');
        });
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





