$(document).ready(function() {
    var selectedOption = ''; // To store the selected list option
    var selectedSymbol = ''; // To store the selected symbol or key
    var buttonValues = {}; // To store values for each button based on the option

    // Initialize selectedOption and selectedSymbol based on the current state of the page
    selectedOption = $('#listOption').text().trim().toLowerCase(); // Assuming the dropdown has an id 'listOption'
    selectedSymbol = $('#selectedButtonValue').text().trim(); // Assuming the element displaying the button value has an id 'selectedButtonValue'
    buttonValues[selectedOption] = selectedSymbol; // Store the selected value for the current option

    // Attempt to fetch and display quickRatio if both option and symbol are selected
    function tryFetchAndDisplayIndicators() {
        if (selectedOption && selectedSymbol) {
            fetchAndDisplayIndicators();
        } else {
            console.log("Waiting for both option and symbol/key selection...");
        }
    }

    // List selection event handlers
    $('#stocksOption').click(function() { 
        selectedOption = 'stock';
        console.log("List option selected: stock");
        selectedSymbol = buttonValues[selectedOption] || ''; // Use the stored value for 'stock' if available
        tryFetchAndDisplayIndicators();
    });
    $('#economicSectorsOption').click(function() { 
        selectedOption = 'economic'; 
        console.log("List option selected: economic");
        selectedSymbol = buttonValues[selectedOption] || ''; // Use the stored value for 'economic' if available
        tryFetchAndDisplayIndicators();
    });
    $('#segmentsOption').click(function() { 
        selectedOption = 'segment'; 
        console.log("List option selected: segment");
        selectedSymbol = buttonValues[selectedOption] || ''; // Use the stored value for 'segment' if available
        tryFetchAndDisplayIndicators();
    });
    $('#subsectorsOption').click(function() { 
        selectedOption = 'subsector'; 
        console.log("List option selected: subsector");
        selectedSymbol = buttonValues[selectedOption] || ''; // Use the stored value for 'subsector' if available
        tryFetchAndDisplayIndicators();
    });

    // Update dropdown display text and store selected symbol or key
    $(".dropdown-menu a.dropdown-item").on('click', function() {
        selectedSymbol = $(this).text().trim(); // Update selectedSymbol when an item is clicked
        $(this).closest('.btn-group').find('.dropdown-toggle').text(selectedSymbol);
        console.log("Selected symbol/key:", selectedSymbol);
        buttonValues[selectedOption] = selectedSymbol; // Store the selected value for the current option
        tryFetchAndDisplayIndicators();
    });

    // Button click event handlers to store the selected value without an option selected
    $('#stockButton').click(function() {
        selectedOption = 'stock';
        selectedSymbol = $(this).text().trim();
        console.log("Button value selected: stock -", selectedSymbol);
        buttonValues[selectedOption] = selectedSymbol;
        tryFetchAndDisplayIndicators();
    });
    $('#economicButton').click(function() {
        selectedOption = 'economic';
        selectedSymbol = $(this).text().trim();
        console.log("Button value selected: economic -", selectedSymbol);
        buttonValues[selectedOption] = selectedSymbol;
        tryFetchAndDisplayIndicators();
    });
    $('#segmentButton').click(function() {
        selectedOption = 'segment';
        selectedSymbol = $(this).text().trim();
        console.log("Button value selected: segment -", selectedSymbol);
        buttonValues[selectedOption] = selectedSymbol;
        tryFetchAndDisplayIndicators();
    });
    $('#subsectorButton').click(function() {
        selectedOption = 'subsector';
        selectedSymbol = $(this).text().trim();
        console.log("Button value selected: subsector -", selectedSymbol);
        buttonValues[selectedOption] = selectedSymbol;
        tryFetchAndDisplayIndicators();
    });





    function fetchAndDisplayIndicators() {
        console.log(`Fetching indicators for ${selectedOption}:`, selectedSymbol);
        
        // Determine the correct keyName based on the option
        var keyName = selectedOption === 'stock' ? 'symbol' : 'key';
        
        // Define the indicators you want to fetch
        var indicators = ['quickRatio', 'currentRatio']; // Add more indicators here as needed
    
        indicators.forEach(indicator => {
            // Ensure you pass the correct keyName for the current option
            var value = findIndicatorInData(selectedSymbol, keyName, getRelevantDataList(selectedOption), selectedOption, indicator);
            console.log(`Displaying ${indicator}:`, value !== null ? value : 'Not Available');
            $(`#${indicator}Display`).text(value !== null ? value : 'Not Available');
        });
    }

    function getRelevantDataList(option) {
        switch (option) {
            case 'stock':
                return table_data_fund;
            case 'economic':
                return weighted_data_economic_sector;
            case 'segment':
                return weighted_data_segment;
            case 'subsector':
                return weighted_data_subsector;
            default:
                console.log(`Invalid option: ${option}`);
                return []; // Return an empty array as a fallback
        }
    }
    
    
    
    function findIndicatorInData(symbolOrKey, keyName, dataList, option, indicatorName) {
        // Define the key mapping based on the option and indicator
        var ratioKeyMap = {
            'quickRatio': option === 'stock' ? 'quickRatio' : 'weighted_mean_quickRatio',
            'currentRatio': option === 'stock' ? 'currentRatio' : 'weighted_mean_currentRatio',
            // Add more mappings here for additional indicators
        };
        
        var ratioKey = ratioKeyMap[indicatorName];
        if (!ratioKey) {
            console.log(`Invalid indicator name: ${indicatorName}`);
            return null;
        }
        
        console.log(`Looking for ${ratioKey} for ${symbolOrKey} in option: ${option}`);
        
        var item = dataList.find(item => item[keyName] === symbolOrKey);
        if (item && item.hasOwnProperty(ratioKey)) {
            console.log(`Found ${ratioKey}:`, item[ratioKey], `for`, symbolOrKey);
            return item[ratioKey];
        } else {
            console.log(`No item found or missing ${ratioKey} for ${symbolOrKey} in option: ${option}`);
            return null;
        }
    }
    
    
    


    

    var mapping = {
        'stocksOption': '#stockButton',
        'segmentsOption': '#segmentButton', // Adjusted the ID here to match the pattern
        'subsectorsOption': '#subsectorButton',
        'economicSectorsOption': '#economicSectorButton',
        'stockExchangeOption': '#stockExchangeButton' // Assuming you have a button for Bovespa
    };
    
    // First, reset all associated buttons to be not clickable and btn-light
    $.each(mapping, function(_, btnId) {
        $(btnId).prop('disabled', true).removeClass('btn-success').addClass('btn-light');
    });
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





