$(document).ready(function(){var e=window.location.hash;function c(e,c,t){e.checked?(e=$(c).length===$(c+":checked").length,$(t).prop("checked",e)):$(t).prop("checked",!1)}e&&$('.nav-pills a[href="'+e+'"]').tab("show"),$.fn.DataTable.isDataTable("#sector-list")||$("#sector-list").DataTable({}),$.fn.DataTable.isDataTable("#subsector-list")||$("#subsector-list").DataTable({}),$.fn.DataTable.isDataTable("#segment-list")||$("#segment-list").DataTable({}),$(".subsector-option").change(function(){var e=$(".subsector-option:checked").map(function(){return $(this).data("value")}).get().join("|");table.column(2).search(e,!0,!1).draw()}),$(".segment-option").change(function(){var e=$(".segment-option:checked").map(function(){return $(this).data("value")}).get().join("|");table.column(3).search(e,!0,!1).draw()}),$(".economicSector-option").change(function(){var e=$(".economicSector-option:checked").map(function(){return $(this).data("value")}).get().join("|");table.column(1).search(e,!0,!1).draw()}),$("#selectAllSubsectors").change(function(){var e=$(this).prop("checked");$(".subsector-option").prop("checked",e).trigger("change")}),$("#selectAllSegments").change(function(){var e=$(this).prop("checked");$(".segment-option").prop("checked",e).trigger("change")}),$("#selectAllEconomicSectors").change(function(){var e=$(this).prop("checked");$(".economicSector-option").prop("checked",e).trigger("change")}),$("#selectAll").change(function(){$(".subsector-option").prop("checked",this.checked)}),$(".subsector-option").change(function(){c(this,".subsector-option","#selectAll")}),$("#selectAllSegments").change(function(){$(".segment-option").prop("checked",this.checked)}),$(".segment-option").change(function(){c(this,".segment-option","#selectAllSegments")}),$("#selectAllEconomicSectors").change(function(){$(".economicSector-option").prop("checked",this.checked)}),$(".economicSector-option").change(function(){c(this,".economicSector-option","#selectAllEconomicSectors")}),s,table.on("draw",function(){updateUniqueCounts()})});