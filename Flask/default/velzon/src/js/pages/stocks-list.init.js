$(document).ready(function() {

    // Initialize DataTables
    table = $('#stock-list').DataTable({
        // DataTables configuration options
    });

    // Event listener for Subsector Dropdown
    $('#subsector-filter').change(function() {
        var subsector = $(this).val();
        table.column(2).search(subsector).draw();
    });

    // Event listener for Segment Dropdown
    $('#segment-filter').change(function() {
        var segment = $(this).val();
        table.column(3).search(segment).draw();
    });

    // Event listener for Economic Sector Dropdown
    $('.economicSector-option').change(function() {
        var selectedSectors = $('.economicSector-option:checked').map(function() {
            return $(this).data('value');
        }).get();
        var economicSectorFilter = selectedSectors.join('|');
        table.column(1).search(economicSectorFilter, true, false).draw();
    });

    // Event listener for "Select All" Subsector
    $('#selectAllSubsectors').change(function() {
        var selected = $(this).prop('checked');
        $('.subsector-option').prop('checked', selected).trigger('change');
    });

    // Event listener for "Select All" Segment
    $('#selectAllSegments').change(function() {
        var selected = $(this).prop('checked');
        $('.segment-option').prop('checked', selected).trigger('change');
    });

    // Event listener for "Select All" Economic Sectors
    $('#selectAllEconomicSectors').change(function() {
        var selected = $(this).prop('checked');
        $('.economicSector-option').prop('checked', selected).trigger('change');
    });

    // Subsector
    $('#selectAll').change(function() {
        $('.subsector-option').prop('checked', this.checked);
    });

    $('.subsector-option').change(function() {
        updateSelectAllState(this, '.subsector-option', '#selectAll');
    });

    // Segment
    $('#selectAllSegments').change(function() {
        $('.segment-option').prop('checked', this.checked);
    });

    $('.segment-option').change(function() {
        updateSelectAllState(this, '.segment-option', '#selectAllSegments');
    });

    // Economic Sector
    $('#selectAllEconomicSectors').change(function() {
        $('.economicSector-option').prop('checked', this.checked);
    });

    $('.economicSector-option').change(function() {
        updateSelectAllState(this, '.economicSector-option', '#selectAllEconomicSectors');
    });

    function updateSelectAllState(checkbox, optionClass, selectAllId) {
        if (!checkbox.checked) {
            $(selectAllId).prop('checked', false);
        } else {
            var allChecked = $(optionClass).length === $(optionClass + ':checked').length;
            $(selectAllId).prop('checked', allChecked);
        }
    }



    // List.js related code
    var options = {
        valueNames: [
            "ticker_name",
            "economic_sector_name",
            "subsector_name",
            "segment_name",
        ],
        page: perPage,
        pagination: true,
        plugins: [
            ListPagination({
                left: 2,
                right: 2
            })
        ]
    };

    function filterData(){
        var iseconomicsector = document.getElementById("idEconomicSector").value;
        var issubsector = document.getElementById("idSubSector").value;
        var issegment = document.getElementById("idSegment").value;
    
        contactList.filter(function (data) {
            matchData = new DOMParser().parseFromString(data.values().status, "text/html");
            var status = matchData.body.firstElementChild.innerHTML;
            var economicsectorFilter = false;
            var subsectorFilter = false;
            var segmentFilter = false;
    
    
            if (status == "all" || iseconomicsector == "all") {
                economicsectorFilter = true;
            } else {
                economicsectorFilter = status == iseconomicsector;
            }
    
            if (status == "all" || issubsector == "all") {
                subsectorFilter = true;
            } else {
                subsectorFilter = status == issubsector;
            }
    
            if (status == "all" || issegment == "all") {
                segmentFilter = true;
            } else {
                segmentFilter = status == issegment;
            }
    
    
            if(economicsectorFilter && subsectorFilter && segmentFilter){
                return economicsectorFilter && subsectorFilter && segmentFilter
            }  else if (economicsectorFilter && subsectorFilter && pickerVal == "") {
                return economicsectorFilter && subsectorFilter;
            } else if (subsectorFilter && segmentFilter && pickerVal == "") {
                return subsectorFilter && segmentFilter;
            }
        });
    
        contactList.update();
    }
});





