$(function () {
  "use strict";

  var create_booking = $(".create-booking"),
    edit_booking = $(".edit-booking"),
    reciept_checkout = $(".reciept-checkout");

  function total(total_amount_amm, total_amount_pak, check_in, check_out) {
    var checked_time = new Date(check_out) - new Date(check_in);
    var days = 0;
    var total = 0;
    if (checked_time / 3600000 <= 24) {
      days = 1;
    } else {
      days = Math.ceil(checked_time / (3600000 * 24));
    }
    total =
      (parseFloat(total_amount_amm) + parseFloat(total_amount_pak)) * days;
    return total;
  }

  if (reciept_checkout.length) {
    $(function () {
      "use strict";
      window.print();
    });
  }

  if (edit_booking.length) {
    var total_amount_amm = 0;
    var total_amount_pak = 0;
    var init_pak_val = parseFloat(
      $('input[name="booking[package]"]:checked').attr("data-prices")
    );
    var check_out = $("#checkout").val();
    var check_in = $("#check_in").val();

    $(".customer-amminities").on("change", function (e) {
      if ($(this).is(":checked")) {
        total_amount_amm += parseFloat($(this).attr("data-price"));
      } else {
        total_amount_amm -= parseFloat($(this).attr("data-price"));
      }
      $("#booking-total").html(
        "Total : " +
          total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
      $("#total_val").val(
        total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
    });

    $(".customer-package").on("change", function (e) {
      total_amount_pak =
        parseFloat($(this).attr("data-price")) == 0
          ? parseFloat($(this).attr("data-price"))
          : parseFloat($(this).attr("data-price")) - init_pak_val;
      $("#booking-total").html(
        "Total : " +
          total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
      $("#total_val").val(
        total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
    });
  }

  if (create_booking.length) {
    var total_amount_amm = 0;
    var total_amount_pak = 0;
    var check_in = 0;
    var check_out = 0;
    $("#check_in").on("change", function (e) {
      check_in = $(this).val();
      $("#booking-total").html(
        "Total : " +
          total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
      $("#total_val").val(
        total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
    });
    $("#checkout").on("change", function (e) {
      check_out = $(this).val();
      $("#booking-total").html(
        "Total : " +
          total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
      $("#total_val").val(
        total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
    });
    $(".customer-amminities").on("change", function (e) {
      if ($(this).is(":checked")) {
        total_amount_amm += parseFloat($(this).attr("data-price"));
      } else {
        total_amount_amm -= parseFloat($(this).attr("data-price"));
      }
      $("#booking-total").html(
        "Total : " +
          total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
      $("#total_val").val(
        total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
    });
    $(".customer-package").on("change", function (e) {
      total_amount_pak = parseFloat($(this).attr("data-price"));
      $("#booking-total").html(
        "Total : " +
          total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
      $("#total_val").val(
        total(total_amount_amm, total_amount_pak, check_in, check_out)
      );
    });
  }
});
