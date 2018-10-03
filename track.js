$("a[data-track='btn_quiz']").on('click', function () {
    dataLayer.push({
        'event': 'gaVirtualPageview',
        'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/testintroduction',
        'gaVirtualPageviewTitle': '‘L’Oreal | Test step 01 – Test introduction'
    });

});

$("#quiz_1 a[data-track='quiz_next']").on('click', function () {
    dataLayer.push({
        'event': 'gaVirtualPageview',
        'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/haircolor',
        'gaVirtualPageviewTitle': '‘L’Oreal | Test step 02 - Hair color'
    });
});

$("#quiz_2 a[data-track='quiz_next']").on('click', function () {
    dataLayer.push({
        'event': 'gaVirtualPageview',
        'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/skincolor',
        'gaVirtualPageviewTitle': '‘L’Oreal | Test step 03 - Skin color'
    });
});

$("#quiz_3 a[data-track='quiz_next']").on('click', function () {
    dataLayer.push({
        'event': 'gaVirtualPageview',
        'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/modeltype',
        'gaVirtualPageviewTitle': '‘L’Oreal | Test step 04 - Model type'
    });
    setTimeout(function () {
        dataLayer.push({
            'event': 'gaVirtualPageview',
            'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/testcompleted',
            'gaVirtualPageviewTitle': '’L’Oreal | Test step 05 - Test completed'
        });
    }, 333);

});