$(document).ready(function(){function e(e,n,c){e.checked?(e=$(n).length===$(n+":checked").length,$(c).prop("checked",e)):$(c).prop("checked",!1)}[{id:"#economic-sector-ind-fund",options:{}},{id:"#subsector-ind-fund",options:{}},{id:"#segment-ind-fund",options:{}}].forEach(function(e){$.fn.DataTable.isDataTable(e.id)?$(e.id).DataTable():$(e.id).DataTable(e.options)}),$(".subsector-option-fund").change(function(){var e=$(".subsector-option-fund:checked").map(function(){return $(this).data("value")}).get().join("|");table.column(2).search(e,!0,!1).draw()}),$(".segment-option-fund").change(function(){var e=$(".segment-option-fund:checked").map(function(){return $(this).data("value")}).get().join("|");table.column(3).search(e,!0,!1).draw()}),$(".economicSector-option-fund").change(function(){var e=$(".economicSector-option-fund:checked").map(function(){return $(this).data("value")}).get().join("|");table.column(1).search(e,!0,!1).draw()}),$("#selectAllSubsectors").change(function(){var e=$(this).prop("checked");$(".subsector-option-fund").prop("checked",e).trigger("change")}),$("#selectAllSegments").change(function(){var e=$(this).prop("checked");$(".segment-option-fund").prop("checked",e).trigger("change")}),$("#selectAllEconomicSectors").change(function(){var e=$(this).prop("checked");$(".economicSector-option-fund").prop("checked",e).trigger("change")}),$("#selectAll").change(function(){$(".subsector-option-fund").prop("checked",this.checked)}),$(".subsector-option-fund").change(function(){e(this,".subsector-option-fund","#selectAll")}),$("#selectAllSegments").change(function(){$(".segment-option-fund").prop("checked",this.checked)}),$(".segment-option-fund").change(function(){e(this,".segment-option-fund","#selectAllSegments")}),$("#selectAllEconomicSectors").change(function(){$(".economicSector-option-fund").prop("checked",this.checked)}),$(".economicSector-option-fund").change(function(){e(this,".economicSector-option-fund","#selectAllEconomicSectors")}),economicSectorTable.on("draw",function(){updateUniqueCounts()}),getLanguage(),subsectorTable.on("draw",function(){updateUniqueCounts()}),getLanguage(),segmentTable.on("draw",function(){updateUniqueCounts()}),getLanguage()});