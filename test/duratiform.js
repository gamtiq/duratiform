/*global chai, describe, it, window*/

// Tests for duratiform component/module
describe("duratiform", function() {
    var nSecond = 1000,
        nMinute = 60 * nSecond,
        nHour = 60 * nMinute,
        nDay = 24 * nHour,
        nWeek = 7 * nDay,
        lib, expect;

    // node
    if (typeof chai === "undefined") {
        lib = require("../duratiform");
        expect = require("./lib/chai").expect;
    }
    // browser
    else {
        lib = window.duratiform;
        expect = chai.expect;
    }


    describe(".divide", function() {
        var divide = lib.divide;

        describe("divide(nDuration)", function() {
            it("should return object with correct 'hour', 'minute' and 'second' fields", function() {
                expect( divide(9 * nHour + 28 * nMinute + 51 * nSecond) )
                    .eql({hour: 9, minute: 28, second: 51});
                expect( divide(4 * nDay + 16 * nHour + 41 * nMinute + 27 * nSecond) )
                    .eql({hour: 112, minute: 41, second: 27});
                expect( divide(2 * nDay + 37 * nMinute + 5 * nSecond) )
                    .eql({hour: 48, minute: 37, second: 5});
                expect( divide(67 * nMinute + 67 * nSecond) )
                    .eql({hour: 1, minute: 8, second: 7});
                expect( divide(8 * nMinute + 12 * nSecond) )
                    .eql({hour: 0, minute: 8, second: 12});
                expect( divide(18 * nHour + 26 * nSecond) )
                    .eql({hour: 18, minute: 0, second: 26});
                expect( divide(17 * nHour + 41 * nMinute) )
                    .eql({hour: 17, minute: 41, second: 0});
            });
        });

        describe("divide(nDuration, 1)", function() {
            it("should return object with correct 'second' field", function() {
                expect( divide(1 * nSecond, 1) )
                    .eql({second: 1});
                expect( divide(26 * nSecond, 1) )
                    .eql({second: 26});
                expect( divide(3410 * nSecond, 1) )
                    .eql({second: 3410});
            });
        });

        describe("divide(nDuration, 2)", function() {
            it("should return object with correct 'minute' and 'second' fields", function() {
                expect( divide(35 * nMinute + 78 * nSecond, 2) )
                    .eql({minute: 36, second: 18});
                expect( divide(10 * nMinute + 26 * nSecond, 2) )
                    .eql({minute: 10, second: 26});
                expect( divide(44 * nMinute, 2) )
                    .eql({minute: 44, second: 0});
                expect( divide(60 * nSecond, 2) )
                    .eql({minute: 1, second: 0});
                expect( divide(59 * nSecond, 2) )
                    .eql({minute: 0, second: 59});
            });
        });

        describe("divide(nDuration, 3)", function() {
            it("should return object with correct 'hour', 'minute' and 'second' fields", function() {
                expect( divide(29 * nHour + 16 * nMinute + 38 * nSecond, 3) )
                    .eql({hour: 29, minute: 16, second: 38});
                expect( divide(11 * nHour + 72 * nMinute, 3) )
                    .eql({hour: 12, minute: 12, second: 0});
                expect( divide(59 * nMinute + 59 * nSecond, 3) )
                    .eql({hour: 0, minute: 59, second: 59});
                expect( divide(59 * nMinute + 60 * nSecond, 3) )
                    .eql({hour: 1, minute: 0, second: 0});
                expect( divide(12 * nHour + 12 * nSecond, 3) )
                    .eql({hour: 12, minute: 0, second: 12});
            });
        });

        describe("divide(nDuration, 4)", function() {
            it("should return object with correct 'day', 'hour', 'minute' and 'second' fields", function() {
                expect( divide(27 * nDay + 17 * nHour + 47 * nMinute + 57 * nSecond, 4) )
                    .eql({day: 27, hour: 17, minute: 47, second: 57});
                expect( divide(1 * nDay, 4) )
                    .eql({day: 1, hour: 0, minute: 0, second: 0});
                expect( divide(3 * nDay + 25 * nHour + 6 * nMinute + 3 * nSecond, 4) )
                    .eql({day: 4, hour: 1, minute: 6, second: 3});
                expect( divide(7 * nDay + 65 * nMinute + 42 * nSecond, 4) )
                    .eql({day: 7, hour: 1, minute: 5, second: 42});
                expect( divide(23 * nHour + 24 * nMinute + 25 * nSecond, 4) )
                    .eql({day: 0, hour: 23, minute: 24, second: 25});
            });
        });

        describe("divide(nDuration, 5)", function() {
            it("should return object with correct 'week', 'day', 'hour', 'minute' and 'second' fields", function() {
                expect( divide(3 * nWeek + 6 * nDay + 17 * nHour + 47 * nMinute + 57 * nSecond, 5) )
                    .eql({week: 3, day: 6, hour: 17, minute: 47, second: 57});
                expect( divide(1 * nDay, 5) )
                    .eql({week: 0, day: 1, hour: 0, minute: 0, second: 0});
                expect( divide(2 * nWeek + 6 * nDay + 25 * nHour + 6 * nMinute + 3 * nSecond, 5) )
                    .eql({week: 3, day: 0, hour: 1, minute: 6, second: 3});
                expect( divide(7 * nDay + 65 * nMinute + 42 * nSecond, 5) )
                    .eql({week: 1, day: 0, hour: 1, minute: 5, second: 42});
                expect( divide(23 * nHour + 24 * nMinute + 25 * nSecond, 5) )
                    .eql({week: 0, day: 0, hour: 23, minute: 24, second: 25});
                expect( divide(4 * nWeek + 4 * nMinute + 9 * nSecond, 5) )
                    .eql({week: 4, day: 0, hour: 0, minute: 4, second: 9});
            });
        });

        describe("divide(nDuration, 1|2|3|4|5, true)", function() {
            it("should return object with correct 'day', 'day2', 'hour', 'hour2', 'minute', 'minute2', 'second' and 'second2' fields", function() {
                expect( divide(4 * nWeek + 4 * nMinute + 9 * nSecond, 5, true) )
                    .eql({week: 4, week2: "04", day: 0, day2: "00", hour: 0, hour2: "00", minute: 4, minute2: "04", second: 9, second2: "09"});
                expect( divide(11 * nWeek + 2 * nDay + 17 * nHour + 7 * nMinute + 57 * nSecond, 5, true) )
                    .eql({week: 11, week2: "11", day: 2, day2: "02", hour: 17, hour2: "17", minute: 7, minute2: "07", second: 57, second2: "57"});
                expect( divide(5 * nDay + 17 * nHour + 4 * nMinute + 28 * nSecond, 4, true) )
                    .eql({day: 5, day2: "05", hour: 17, hour2: "17", minute: 4, minute2: "04", second: 28, second2: "28"});
                expect( divide(12 * nDay + 4 * nHour + 16 * nMinute, 4, true) )
                    .eql({day: 12, day2: "12", hour: 4, hour2: "04", minute: 16, minute2: "16", second: 0, second2: "00"});
                expect( divide(358 * nHour + 29 * nMinute + 7 * nSecond, 3, true) )
                    .eql({hour: 358, hour2: "358", minute: 29, minute2: "29", second: 7, second2: "07"});
                expect( divide(1 * nHour + 2 * nSecond, 3, true) )
                    .eql({hour: 1, hour2: "01", minute: 0, minute2: "00", second: 2, second2: "02"});
                expect( divide(52 * nMinute + 38 * nSecond, 3, true) )
                    .eql({hour: 0, hour2: "00", minute: 52, minute2: "52", second: 38, second2: "38"});
                expect( divide(46 * nMinute + 9 * nSecond, 2, true) )
                    .eql({minute: 46, minute2: "46", second: 9, second2: "09"});
                expect( divide(51 * nSecond, 2, true) )
                    .eql({minute: 0, minute2: "00", second: 51, second2: "51"});
                expect( divide(0, 2, true) )
                    .eql({minute: 0, minute2: "00", second: 0, second2: "00"});
                expect( divide(7 * nSecond, 1, true) )
                    .eql({second: 7, second2: "07"});
            });
        });
    });

    describe(".format", function() {
        var format = lib.format;

        describe("format(nDuration)", function() {
            it("should return correct 'hh:mm:ss' string", function() {
                expect( format(19 * nHour + 12 * nMinute + 34 * nSecond) )
                    .equal("19:12:34");
                expect( format(10 * nDay + 23 * nHour + 52 * nMinute + 9 * nSecond) )
                    .equal("263:52:09");
                expect( format(2 * nDay + 3 * nMinute + 47 * nSecond) )
                    .equal("48:03:47");
                expect( format(7 * nHour + 2 * nMinute + 1 * nSecond) )
                    .equal("07:02:01");
                expect( format(57 * nMinute + 32 * nSecond) )
                    .equal("00:57:32");
                expect( format(35 * nHour + 28 * nSecond) )
                    .equal("35:00:28");
                expect( format(99 * nHour + 61 * nMinute) )
                    .equal("100:01:00");
                expect( format(0) )
                    .equal("00:00:00");
            });
        });

        describe("format(nDuration, sFormat)", function() {
            it("should return correct 'ss' string", function() {
                expect( format(10 * nSecond, "ss") )
                    .equal("10");
                expect( format(23489 * nSecond, "ss") )
                    .equal("23489");
                expect( format(72 * nSecond, "ss") )
                    .equal("72");
            });
            it("should return correct 'mm:ss' string", function() {
                expect( format(600 * nSecond, "mm:ss") )
                    .equal("10:00");
                expect( format(5 * nMinute + 37 * nSecond, "mm:ss") )
                    .equal("05:37");
                expect( format(105 * nMinute + 9 * nSecond, "mm:ss") )
                    .equal("105:09");
                expect( format(21 * nMinute + 68 * nSecond, "mm:ss") )
                    .equal("22:08");
                expect( format(52 * nSecond, "mm:ss") )
                    .equal("00:52");
                expect( format(0, "mm:ss") )
                    .equal("00:00");
            });
            it("should return correct 'mm' string", function() {
                expect( format(630 * nSecond, "mm") )
                    .equal("10");
                expect( format(7 * nMinute + 89 * nSecond, "mm") )
                    .equal("08");
                expect( format(111 * nMinute + 32 * nSecond, "mm") )
                    .equal("111");
            });
            it("should return correct 'hh:mm:ss' string", function() {
                expect( format(nHour, "hh:mm:ss") )
                    .equal("01:00:00");
                expect( format(nDay, "hh:mm:ss") )
                    .equal("24:00:00");
                expect( format(23 * nHour + 59 * nMinute + 59 * nSecond, "hh:mm:ss") )
                    .equal("23:59:59");
                expect( format(32 * nMinute + 70 * nSecond, "hh:mm:ss") )
                    .equal("00:33:10");
                expect( format(4 * nHour + 3 * nSecond, "hh:mm:ss") )
                    .equal("04:00:03");
                expect( format(15 * nHour + 6 * nMinute, "hh:mm:ss") )
                    .equal("15:06:00");
                expect( format(0, "hh:mm:ss") )
                    .equal("00:00:00");
            });
            it("should return correct 'hh:mm' string", function() {
                expect( format(53 * nHour, "hh:mm") )
                    .equal("53:00");
                expect( format(3 * nDay, "hh:mm") )
                    .equal("72:00");
                expect( format(15 * nHour + 43 * nMinute + 26 * nSecond, "hh:mm") )
                    .equal("15:43");
                expect( format(27 * nMinute + 20 * nSecond, "hh:mm") )
                    .equal("00:27");
                expect( format(51 * nSecond, "hh:mm") )
                    .equal("00:00");
            });
            it("should return correct 'hh' string", function() {
                expect( format(28 * nHour, "hh") )
                    .equal("28");
                expect( format(0.5 * nDay, "hh") )
                    .equal("12");
                expect( format(8 * nHour + 17 * nMinute + 4 * nSecond, "hh") )
                    .equal("08");
                expect( format(59 * nMinute + 59 * nSecond, "hh") )
                    .equal("00");
            });
            it("should return correct 'dd:hh:mm:ss' string", function() {
                expect( format(nMinute, "dd:hh:mm:ss") )
                    .equal("00:00:01:00");
                expect( format(nHour, "dd:hh:mm:ss") )
                    .equal("00:01:00:00");
                expect( format(nDay, "dd:hh:mm:ss") )
                    .equal("01:00:00:00");
                expect( format(23 * nHour + 59 * nMinute + 59 * nSecond, "dd:hh:mm:ss") )
                    .equal("00:23:59:59");
                expect( format(2 * nDay + 22 * nHour + 5 * nMinute + 37 * nSecond, "dd:hh:mm:ss") )
                    .equal("02:22:05:37");
                expect( format(15 * nDay + 43 * nMinute + 6 * nSecond, "dd:hh:mm:ss") )
                    .equal("15:00:43:06");
                expect( format(79 * nDay + 5 * nHour + 12 * nSecond, "dd:hh:mm:ss") )
                    .equal("79:05:00:12");
                expect( format(16 * nDay + 19 * nHour + 43 * nMinute, "dd:hh:mm:ss") )
                    .equal("16:19:43:00");
                expect( format(0, "dd:hh:mm:ss") )
                    .equal("00:00:00:00");
            });
            it("should return correct 'dd:hh:mm' string", function() {
                expect( format(25 * nMinute, "dd:hh:mm") )
                    .equal("00:00:25");
                expect( format(6 * nHour, "dd:hh:mm") )
                    .equal("00:06:00");
                expect( format(21 * nHour + 7 * nMinute + 33 * nSecond, "dd:hh:mm") )
                    .equal("00:21:07");
                expect( format(903 * nDay + 18 * nHour + 47 * nMinute + 53 * nSecond, "dd:hh:mm") )
                    .equal("903:18:47");
                expect( format(5 * nDay + 21 * nMinute + 88 * nSecond, "dd:hh:mm") )
                    .equal("05:00:22");
                expect( format(49 * nDay + 12 * nHour + 46 * nSecond, "dd:hh:mm") )
                    .equal("49:12:00");
                expect( format(14 * nHour + 40 * nMinute, "dd:hh:mm") )
                    .equal("00:14:40");
                expect( format(0, "dd:hh:mm") )
                    .equal("00:00:00");
            });
            it("should return correct 'dd:hh' string", function() {
                expect( format(46 * nMinute, "dd:hh") )
                    .equal("00:00");
                expect( format(9 * nHour, "dd:hh") )
                    .equal("00:09");
                expect( format(15 * nHour + 29 * nMinute + 42 * nSecond, "dd:hh") )
                    .equal("00:15");
                expect( format(2056 * nDay + 17 * nHour + 4 * nMinute + 26 * nSecond, "dd:hh") )
                    .equal("2056:17");
                expect( format(7 * nDay + 10 * nMinute, "dd:hh") )
                    .equal("07:00");
                expect( format(23 * nDay + 24 * nHour + 60 * nSecond, "dd:hh") )
                    .equal("24:00");
                expect( format(4 * nDay + 4 * nHour + 4 * nMinute, "dd:hh") )
                    .equal("04:04");
                expect( format(26 * nDay + 8 * nHour, "dd:hh") )
                    .equal("26:08");
                expect( format(3 * nDay + 19 * nHour, "dd:hh") )
                    .equal("03:19");
            });
            it("should return correct 'dd' string", function() {
                expect( format(125 * nMinute, "dd") )
                    .equal("00");
                expect( format(48 * nHour, "dd") )
                    .equal("02");
                expect( format(19 * nHour + 37 * nMinute + 53 * nSecond, "dd") )
                    .equal("00");
                expect( format(12345 * nDay + 15 * nHour + 203 * nMinute + 689 * nSecond, "dd") )
                    .equal("12345");
                expect( format(9 * nDay + 123 * nMinute, "dd") )
                    .equal("09");
                expect( format(22 * nDay + 7 * nHour + 25 * nSecond, "dd") )
                    .equal("22");
            });
            it("should return correct 'ww:dd:hh:mm:ss' string", function() {
                expect( format(nMinute, "ww:dd:hh:mm:ss") )
                    .equal("00:00:00:01:00");
                expect( format(nHour, "ww:dd:hh:mm:ss") )
                    .equal("00:00:01:00:00");
                expect( format(nDay, "ww:dd:hh:mm:ss") )
                    .equal("00:01:00:00:00");
                expect( format(nWeek, "ww:dd:hh:mm:ss") )
                    .equal("01:00:00:00:00");
                expect( format(23 * nHour + 59 * nMinute + 59 * nSecond, "ww:dd:hh:mm:ss") )
                    .equal("00:00:23:59:59");
                expect( format(10 * nWeek + 2 * nDay + 22 * nHour + 5 * nMinute + 37 * nSecond, "ww:dd:hh:mm:ss") )
                    .equal("10:02:22:05:37");
                expect( format(15 * nDay + 43 * nMinute + 6 * nSecond, "ww:dd:hh:mm:ss") )
                    .equal("02:01:00:43:06");
                expect( format(79 * nWeek + 4 * nDay + 5 * nHour + 12 * nSecond, "ww:dd:hh:mm:ss") )
                    .equal("79:04:05:00:12");
                expect( format(16 * nDay + 19 * nHour + 43 * nMinute, "ww:dd:hh:mm:ss") )
                    .equal("02:02:19:43:00");
                expect( format(0, "ww:dd:hh:mm:ss") )
                    .equal("00:00:00:00:00");
            });
            it("should return correct 'ww:dd:hh:mm' string", function() {
                expect( format(nMinute, "ww:dd:hh:mm") )
                    .equal("00:00:00:01");
                expect( format(nHour, "ww:dd:hh:mm") )
                    .equal("00:00:01:00");
                expect( format(nDay, "ww:dd:hh:mm") )
                    .equal("00:01:00:00");
                expect( format(nWeek, "ww:dd:hh:mm") )
                    .equal("01:00:00:00");
                expect( format(23 * nHour + 59 * nMinute + 59 * nSecond, "ww:dd:hh:mm") )
                    .equal("00:00:23:59");
                expect( format(10 * nWeek + 2 * nDay + 22 * nHour + 5 * nMinute + 37 * nSecond, "ww:dd:hh:mm") )
                    .equal("10:02:22:05");
                expect( format(15 * nDay + 43 * nMinute + 6 * nSecond, "ww:dd:hh:mm") )
                    .equal("02:01:00:43");
                expect( format(79 * nWeek + 4 * nDay + 5 * nHour + 12 * nSecond, "ww:dd:hh:mm") )
                    .equal("79:04:05:00");
                expect( format(16 * nDay + 19 * nHour + 43 * nMinute, "ww:dd:hh:mm") )
                    .equal("02:02:19:43");
                expect( format(0, "ww:dd:hh:mm") )
                    .equal("00:00:00:00");
            });
            it("should return correct 'ww:dd:hh' string", function() {
                expect( format(nMinute, "ww:dd:hh") )
                    .equal("00:00:00");
                expect( format(nHour, "ww:dd:hh") )
                    .equal("00:00:01");
                expect( format(nDay, "ww:dd:hh") )
                    .equal("00:01:00");
                expect( format(nWeek, "ww:dd:hh") )
                    .equal("01:00:00");
                expect( format(23 * nHour + 59 * nMinute + 59 * nSecond, "ww:dd:hh") )
                    .equal("00:00:23");
                expect( format(10 * nWeek + 2 * nDay + 22 * nHour + 5 * nMinute + 37 * nSecond, "ww:dd:hh") )
                    .equal("10:02:22");
                expect( format(15 * nDay + 43 * nMinute + 6 * nSecond, "ww:dd:hh") )
                    .equal("02:01:00");
                expect( format(79 * nWeek + 4 * nDay + 5 * nHour + 12 * nSecond, "ww:dd:hh") )
                    .equal("79:04:05");
                expect( format(16 * nDay + 19 * nHour + 43 * nMinute, "ww:dd:hh") )
                    .equal("02:02:19");
                expect( format(0, "ww:dd:hh") )
                    .equal("00:00:00");
            });
            it("should return correct 'ww:dd' string", function() {
                expect( format(nHour, "ww:dd") )
                    .equal("00:00");
                expect( format(nDay, "ww:dd") )
                    .equal("00:01");
                expect( format(nWeek, "ww:dd") )
                    .equal("01:00");
                expect( format(23 * nHour + 59 * nMinute + 59 * nSecond, "ww:dd") )
                    .equal("00:00");
                expect( format(10 * nWeek + 2 * nDay + 22 * nHour + 5 * nMinute + 37 * nSecond, "ww:dd") )
                    .equal("10:02");
                expect( format(15 * nDay + 43 * nMinute + 6 * nSecond, "ww:dd") )
                    .equal("02:01");
                expect( format(79 * nWeek + 4 * nDay + 5 * nHour + 12 * nSecond, "ww:dd") )
                    .equal("79:04");
                expect( format(16 * nDay + 19 * nHour + 43 * nMinute, "ww:dd") )
                    .equal("02:02");
            });
            it("should return correct 'ww' string", function() {
                expect( format(nDay, "ww") )
                    .equal("00");
                expect( format(nWeek, "ww") )
                    .equal("01");
                expect( format(23 * nHour + 59 * nMinute + 59 * nSecond, "ww") )
                    .equal("00");
                expect( format(10 * nWeek + 2 * nDay + 22 * nHour + 5 * nMinute + 37 * nSecond, "ww") )
                    .equal("10");
                expect( format(15 * nDay + 43 * nMinute + 6 * nSecond, "ww") )
                    .equal("02");
                expect( format(79 * nWeek + 4 * nDay + 5 * nHour + 12 * nSecond, "ww") )
                    .equal("79");
                expect( format(16 * nDay + 19 * nHour + 43 * nMinute, "ww") )
                    .equal("02");
            });
            describe("should return correct result string", function() {
                var testList = [
                    {
                        duration: 3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond,
                        format: "\\day\\s: dd, \\hour\\s: hh, \\minute\\s: mm, \\secon\\d\\s: ss",
                        result: "days: 03, hours: 05, minutes: 46, seconds: 37"
                    },
                    {
                        duration: 3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond,
                        format: "[days]: dd, [hours]: hh, [minutes]: mm, [seconds]: ss",
                        result: "days: 03, hours: 05, minutes: 46, seconds: 37"
                    },
                    {
                        duration: 3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond,
                        format: "[days: dd], [hours: hh], [minutes: mm], [seconds: ss]",
                        result: "days: dd, hours: hh, minutes: mm, seconds: ss"
                    },
                    {
                        duration: 3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond,
                        format: "[days: dd, hours: hh, minutes: mm, seconds: ss",
                        result: "days: dd, hours: hh, minutes: mm, seconds: ss"
                    },
                    {
                        duration: 14 * nDay + 7 * nHour + 9 * nMinute + 28 * nSecond,
                        format: "\\day\\s: d, \\hour\\s: h, \\minute\\s: m, \\secon\\d\\s: s",
                        result: "days: 14, hours: 7, minutes: 9, seconds: 28"
                    },
                    {
                        duration: 14 * nDay + 7 * nHour + 9 * nMinute + 28 * nSecond,
                        format: "[weeks]: w, [days]: d, [hours]: h, [minutes]: m, [seconds]: s",
                        result: "weeks: 2, days: 0, hours: 7, minutes: 9, seconds: 28"
                    },
                    {
                        duration: 4 * nDay + 7 * nHour + 9 * nMinute + 28 * nSecond,
                        format: "[weeks]: w, [days]: d, [hours]: hh, [minutes]: mm, [seconds]: ss",
                        result: "weeks: 0, days: 4, hours: 07, minutes: 09, seconds: 28"
                    },
                    {
                        duration: 3 * nDay + 5 * nHour + 46 * nMinute + 37 * nSecond,
                        format: "Day\\s: dd, Hour\\s: hh, Minute\\s: mm, Secon\\d\\s: ss",
                        result: "Days: 03, Hours: 05, Minutes: 46, Seconds: 37"
                    },
                    {
                        duration: 23 * nDay + 8 * nHour + 7 * nMinute + 36 * nSecond,
                        format: "DAYS: d, HOURS: h, MINUTES: m, SECONDS: s",
                        result: "DAYS: 23, HOURS: 8, MINUTES: 7, SECONDS: 36"
                    },
                    {
                        duration: 7 * nDay + 3 * nHour + 41 * nMinute + 9 * nSecond,
                        format: "-d:hh:mm:ss",
                        result: "-7:03:41:09"
                    },
                    {
                        duration: 13 * nHour + 8 * nMinute + 5 * nSecond,
                        format: "\\[\\dur: h:m:ss\\]",
                        result: "[dur: 13:8:05]"
                    },
                    {
                        duration: 35 * nDay + 16 * nHour + 2 * nMinute + 8 * nSecond,
                        format: "d-h-m-s",
                        result: "35-16-2-8"
                    },
                    {
                        duration: 8 * nDay + 15 * nHour + 4 * nMinute + 52 * nSecond,
                        format: "dd\\\\hh\\\\mm\\\\ss",
                        result: "08\\15\\04\\52"
                    },
                    {
                        duration: 2 * nDay + 22 * nHour + 9 * nMinute + 56 * nSecond,
                        format: "\\d-h-m-s",
                        result: "d-70-9-56"
                    },
                    {
                        duration: nDay + 5 * nHour + 15 * nMinute,
                        format: "[[days\\]]: -, [hours]: h, [seconds]: ss",
                        result: "[days]: -, hours: 29, seconds: 00"
                    },
                    {
                        duration: 7 * nDay + 23 * nHour + 10 * nMinute,
                        format: "[[days]: d]: dd, [hours]: h, minute: s",
                        result: "[days: 7]: 07, hours: 23, 10inute: 0"
                    },
                    {
                        duration: 7 * nDay + 23 * nHour + 10 * nMinute,
                        format: "[[days\\]: d]: dd, [hours]: h, \\minute: s",
                        result: "[days]: d: 07, hours: 23, minute: 0"
                    },
                    {
                        duration: nDay,
                        format: "- [hours]: h, [hours]: h, [hours]: h\\h\\",
                        result: "- hours: 24, hours: 24, hours: 24h"
                    },
                    {
                        duration: 365 * nDay + 23 * nHour + 59 * nMinute + 59 * nSecond,
                        format: "Строка без специальных символов",
                        result: "Строка без специальных символов"
                    },
                    {
                        duration: 365 * nDay + 23 * nHour + 59 * nMinute + 59 * nSecond,
                        format: "дни: d, часы: h, минуты: m, секунды: s",
                        result: "дни: 365, часы: 23, минуты: 59, секунды: 59"
                    },
                    {
                        duration: 365 * nDay + 23 * nHour + 59 * nMinute + 59 * nSecond,
                        format: "недели: w, дни: d, часы: h, минуты: m, секунды: s",
                        result: "недели: 52, дни: 1, часы: 23, минуты: 59, секунды: 59"
                    },
                    {
                        duration: 7 * nWeek + 3 * nDay + 8 * nHour + 4 * nMinute + 7 * nSecond,
                        format: "(w:[weeks - ]w;)(d: [days - ]dd;)(h: [hours - ]hh;)(m: [minutes - ]mm;)(s: [seconds - ]ss)",
                        result: "weeks - 7; days - 03; hours - 08; minutes - 04; seconds - 07"
                    },
                    {
                        duration: 3 * nDay + 16 * nHour + 4 * nMinute + 27 * nSecond,
                        format: "(w:[weeks - ]w;)(d:(w: )[days - ]d;)(h: [hours - ]h;)(m: [minutes - ]mm;)(s: [seconds - ]ss)",
                        result: "days - 3; hours - 16; minutes - 04; seconds - 27"
                    },
                    {
                        duration: 3 * nDay + 16 * nHour + 4 * nMinute + 27 * nSecond,
                        format: "(d:[days - ]d;)(h: [hours - ]h;)(m: [minutes - ]mm;)(s: [seconds - ]ss)",
                        result: "days - 3; hours - 16; minutes - 04; seconds - 27"
                    },
                    {
                        duration: 1 * nDay + 4 * nHour + 8 * nMinute + 41 * nSecond,
                        format: "(h:h [hour(s) ])(m:mm[ minute(s)])",
                        result: "28 hour(s) 08 minute(s)"
                    },
                    {
                        duration: 1 * nDay + 4 * nHour + 8 * nMinute + 41 * nSecond,
                        format: "(m:(h:h [hour(s) ])mm[ minute(s)])",
                        result: "28 hour(s) 08 minute(s)"
                    },
                    {
                        duration: 49 * nMinute + 6 * nSecond,
                        format: "(h:h [hour(s) ])(m:mm[ minute(s)])",
                        result: "49 minute(s)"
                    },
                    {
                        duration: 49 * nMinute + 6 * nSecond,
                        format: "(m:(h:h [hour(s) ])mm[ minute(s)])",
                        result: "49 minute(s)"
                    },
                    {
                        duration: 49 * nMinute + 6 * nSecond,
                        format: "(m\\: (s\\: ))",
                        result: "(49: (6: ))"
                    },
                    {
                        duration: 15 * nHour + 3 * nMinute + 57 * nSecond,
                        format: "(d:d:)(h:h:)(m:mm:)(s:ss)",
                        result: "15:03:57"
                    },
                    {
                        duration: 3 * nMinute + 57 * nSecond,
                        format: "(d:d:)(h:h:)(m:mm:)(s:ss)",
                        result: "03:57"
                    },
                    {
                        duration: 15 * nHour + 3 * nMinute + 57 * nSecond,
                        format: "(h:h:(m:mm:(s:ss",
                        result: "15:03:57"
                    },
                    {
                        duration: 15 * nHour + 3 * nMinute + 57 * nSecond,
                        format: "(h:h:(m:mm:)(s:ss",
                        result: "15:03:57"
                    },
                    {
                        duration: 39 * nMinute + 3 * nSecond,
                        format: "(d:[days - ]d; )(h:[hours - ]h; )(m:[(m:)inutes - ]mm(m:(m:)!); )(s:[second(s:) - ]ss(m:(s:(h:=).).).)",
                        result: "(m:)inutes - 39!; second(s:) - 03..."
                    },
                    {
                        duration: nDay,
                        format: "Ti\\meout: (h:h \\hr)(m: m \\min)",
                        result: "Timeout: 24 hr"
                    },
                    {
                        duration: 5 * nHour + 47 * nSecond,
                        format: "Duration:(h: h \\hr)(m: mm \\min)",
                        result: "Duration: 5 hr"
                    },
                    {
                        duration: 5 * nHour + 8 * nMinute + 26 * nSecond,
                        format: "Duration:(h: h \\hr)(m: mm \\min)",
                        result: "Duration: 5 hr 08 min"
                    },
                    {
                        duration: 8 * nMinute + 59 * nSecond + 999,
                        format: "Duration:(h: h \\hr)(m: mm \\min)",
                        result: "Duration: 08 min"
                    },
                    {
                        duration: 4 * nHour + 8 * nMinute + 9 * nSecond,
                        format: "Duration:(h: h [hr](m: mm [min]))",
                        result: "Duration: 4 hr 08 min"
                    },
                    {
                        duration: 4 * nHour + 9 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min))",
                        result: "Duration: 4 hr"
                    },
                    {
                        duration: 2 * nDay + 4 * nHour + 9 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min))",
                        result: "Duration: 52 hr"
                    },
                    {
                        duration: 4 * nHour + 9 * nSecond,
                        format: "Duration:(h: h [hr](m: mm [min])(s: ss [sec]))",
                        result: "Duration: 4 hr 09 sec"
                    },
                    {
                        duration: 53 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min))",
                        result: "Duration:"
                    },
                    {
                        duration: 53 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min)(s: ss \\sec))",
                        result: "Duration:"
                    },
                    {
                        duration: 53 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min(s: ss \\sec)))",
                        result: "Duration:"
                    },
                    {
                        duration: 7 * nHour + 53 * nMinute + 2 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min(s: ss \\sec)))",
                        result: "Duration: 7 hr 53 min 02 sec"
                    },
                    {
                        duration: 7 * nHour + 12 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min(s: ss \\sec)))",
                        result: "Duration: 7 hr"
                    },
                    {
                        duration: 7 * nHour + 5 * nMinute,
                        format: "Duration:(h: h \\hr(m: mm \\min(s: ss \\sec)))",
                        result: "Duration: 7 hr 05 min"
                    },
                    {
                        duration: 3 * nMinute,
                        format: "[!hours (h:h) - ](h:h); [(!m:) ](!h:m)",
                        result: "!hours (h:h) - ; (!m:) 3"
                    },
                    {
                        duration: 2 * nHour + 3 * nMinute + 59 * nSecond,
                        format: "[!hours (h:h) - ](h:h); [(!m:) ](!h:m)",
                        result: "!hours (h:h) - 2; (!m:) "
                    },
                    {
                        duration: 53 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min))(!h: m \\min)",
                        result: "Duration: 53 min"
                    },
                    {
                        duration: 7 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h [hr](m: mm [min]))(!h: m [min])",
                        result: "Duration: 7 min"
                    },
                    {
                        duration: 4 * nHour + 7 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h [hr](m: mm [min]))(!h: m [min])",
                        result: "Duration: 4 hr 07 min"
                    },
                    {
                        duration: 6 * nHour + 53 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min(s: ss \\sec)))(!h: (m:m \\min(s: ss \\sec))(!m:s \\sec))",
                        result: "Duration: 6 hr 53 min 27 sec"
                    },
                    {
                        duration: 19 * nHour + 53 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h [hr](m: mm [min](s: ss [sec])))(!h: (m:m [min](s: ss [sec]))(!m:s [sec]))",
                        result: "Duration: 19 hr 53 min 27 sec"
                    },
                    {
                        duration: 19 * nHour + 2 * nMinute + 5 * nSecond,
                        format: "Duration:(h: h [hr](m: mm [min](s: ss [sec])))(!h: (m:m [min](s: ss [sec]))(!m:s [sec]))",
                        result: "Duration: 19 hr 02 min 05 sec"
                    },
                    {
                        duration: 53 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min(s: ss \\sec)))(!h: (m:m \\min(s: ss \\sec))(!m:s \\sec))",
                        result: "Duration: 53 min 27 sec"
                    },
                    {
                        duration: 8 * nMinute + 27 * nSecond,
                        format: "Duration:(h: h [hr](m: mm [min](s: ss [sec])))(!h: (m:m [min](s: ss [sec]))(!m:s [sec]))",
                        result: "Duration: 8 min 27 sec"
                    },
                    {
                        duration: 8 * nMinute + 3 * nSecond,
                        format: "Duration:(h: h [hr](m: mm [min](s: ss [sec])))(!h: (m:m [min](s: ss [sec]))(!m:s [sec]))",
                        result: "Duration: 8 min 03 sec"
                    },
                    {
                        duration: 49 * nSecond,
                        format: "Duration:(h: h \\hr(m: mm \\min(s: ss \\sec)))(!h: (m:m \\min(s: ss \\sec))(!m:s \\sec))",
                        result: "Duration: 49 sec"
                    },
                    {
                        duration: 9 * nSecond,
                        format: "Duration:(h: h [hr](m: mm [min](s: ss [sec])))(!h: (m:m [min](s: ss [sec]))(!m:s [sec]))",
                        result: "Duration: 9 sec"
                    },
                    {
                        duration: 33 * nDay + 23 * nHour + 48 * nMinute + 15 * nSecond,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d: (h:h:mm:ss)(!h:m:ss))",
                        result: "33 day(s) 23 hour(s) 48 minute(s) 15 second(s)"
                    },
                    {
                        duration: 33 * nDay + 48 * nMinute + 15 * nSecond,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d: (h:h:mm:ss)(!h:m:ss))",
                        result: "33 day(s) 48 minute(s) 15 second(s)"
                    },
                    {
                        duration: 33 * nDay + 23 * nHour + 15 * nSecond,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d: (h:h:mm:ss)(!h:m:ss))",
                        result: "33 day(s) 23 hour(s) 15 second(s)"
                    },
                    {
                        duration: 5 * nDay + 3 * nHour + 8 * nMinute + 1 * nSecond,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d: (h:h:mm:ss)(!h:m:ss))",
                        result: "5 day(s) 3 hour(s) 8 minute(s) 1 second(s)"
                    },
                    {
                        duration: 5 * nDay + 3 * nHour,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d: (h:h:mm:ss)(!h:m:ss))",
                        result: "5 day(s) 3 hour(s)"
                    },
                    {
                        duration: 5 * nDay + 8 * nMinute,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d: (h:h:mm:ss)(!h:m:ss))",
                        result: "5 day(s) 8 minute(s)"
                    },
                    {
                        duration: 5 * nDay + 1 * nSecond,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d: (h:h:mm:ss)(!h:m:ss))",
                        result: "5 day(s) 1 second(s)"
                    },
                    {
                        duration: 23 * nHour + 48 * nMinute + 15 * nSecond,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d:(h:h:mm:ss)(!h:m:ss))",
                        result: "23:48:15"
                    },
                    {
                        duration: 8 * nHour + 2 * nMinute + 5 * nSecond,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d:(h:h:mm:ss)(!h:m:ss))",
                        result: "8:02:05"
                    },
                    {
                        duration: 48 * nMinute + 15 * nSecond,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d:(h:h:mm:ss)(!h:m:ss))",
                        result: "48:15"
                    },
                    {
                        duration: 2 * nMinute + 5 * nSecond,
                        format: "(d:d [day(s)](h: h [hour(s)])(m: m [minute(s)])(s: s [second(s)]))(!d:(h:h:mm:ss)(!h:m:ss))",
                        result: "2:05"
                    },
                    {
                        duration: 9 * nWeek + 14 * nHour + 30 * nSecond,
                        format: "(w:ww [week(s)](d: d [day(s)]))(!w:(d:d [day(s)])(h:(d: )h [hour(s)]))[ ago]",
                        result: "09 week(s) ago"
                    },
                    {
                        duration: 9 * nWeek + 14 * nHour + 30 * nSecond,
                        format: "(w:w [week(s)](d: d [day(s)]))(!w:(d:d [day(s)])(h:(d: )h [hour(s)]))[ ago]",
                        result: "9 week(s) ago"
                    },
                    {
                        duration: 15 * nWeek + 4 * nDay + 22 * nHour + 49 * nMinute,
                        format: "(w:w [week(s)](d: dd [day(s)]))(!w:(d:d [day(s)])(h:(d: )h [hour(s)]))[ ago]",
                        result: "15 week(s) 04 day(s) ago"
                    },
                    {
                        duration: 6 * nDay + 23 * nHour + 59 * nMinute + 59 * nSecond,
                        format: "(w:w [week(s)](d: d [day(s)]))(!w:(d:d [day(s)])(h:(d: )h [hour(s)]))[ ago]",
                        result: "6 day(s) 23 hour(s) ago"
                    },
                    {
                        duration: 23 * nHour + 59 * nMinute,
                        format: "(w:w [week(s)](d: d [day(s)]))(!w:(d:d [day(s)])(h:(d: )h [hour(s)]))[ ago]",
                        result: "23 hour(s) ago"
                    }
                ];

                function doTest(nIndex, testItem) {
                    (testItem.only ? it.only : it)(nIndex + ": " + testItem.duration + ", " + testItem.format + " ---> " + testItem.result, function() {
                        expect( format(testItem.duration, testItem.format) )
                            .equal( testItem.result );
                    });
                }

                for (var nI = 0, nL = testList.length; nI < nL; nI++) {
                    doTest(nI, testList[nI]);
                }
            });
        });
    });
});
