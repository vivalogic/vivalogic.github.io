$("a[data-track='btn_quiz']").on('click', function () {
    dataLayer.push({
        'event': 'gaVirtualPageview',
        'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/testintroduction',
        'gaVirtualPageviewTitle': '‘L’Oreal | Test step 01 – Test introduction'
    });
    gtag('config', 'UA-74716905-5', {'page_path': '/emag/hu/dekorkozmetika/oktober-true-match/test/testintroduction'});
});

$("#quiz_1 a[data-track='quiz_next']").on('click', function () {
    dataLayer.push({
        'event': 'gaVirtualPageview',
        'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/haircolor',
        'gaVirtualPageviewTitle': '‘L’Oreal | Test step 02 - Hair color'
    });
    gtag('config', 'UA-74716905-5', {'page_path': '/emag/hu/dekorkozmetika/oktober-true-match/test/haircolor'});    
});

$("#quiz_2 a[data-track='quiz_next']").on('click', function () {
    dataLayer.push({
        'event': 'gaVirtualPageview',
        'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/skincolor',
        'gaVirtualPageviewTitle': '‘L’Oreal | Test step 03 - Skin color'
    });
    gtag('config', 'UA-74716905-5', {'page_path': '/emag/hu/dekorkozmetika/oktober-true-match/test/skincolor'});
});

$("#quiz_3 a[data-track='quiz_next']").on('click', function () {
    dataLayer.push({
        'event': 'gaVirtualPageview',
        'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/modeltype',
        'gaVirtualPageviewTitle': '‘L’Oreal | Test step 04 - Model type'
    });
    gtag('config', 'UA-74716905-5', {'page_path': '/emag/hu/dekorkozmetika/oktober-true-match/test/modeltype'});
    setTimeout(function () {
        dataLayer.push({
            'event': 'gaVirtualPageview',
            'gaVirtualPageviewUrl': '/dekorkozmetika/oktober-true-match/test/testcompleted',
            'gaVirtualPageviewTitle': '’L’Oreal | Test step 05 - Test completed'
        });
        gtag('config', 'UA-74716905-5', {'page_path': '/emag/hu/dekorkozmetika/oktober-true-match/test/testcompleted'});
    },333);
});
