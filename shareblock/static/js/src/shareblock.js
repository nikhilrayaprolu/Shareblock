/* Javascript for ShareXBlock. */
function ShareXBlock(runtime, element) {
    STUDIO_BASE_URL = 'http://localhost:18010'
    LMS_BASE_URL = 'http://localhost:18000'
    list_author_URL = '/api/courses/v1/courses/'

    function updateCount(result) {
        $('.count', element).text(result.count);
    }
    function updateCourses(result) {
        count = 0
        for(let course of result.results){
        var para = document.createElement("P");                       // Create a <p> element
        var t = document.createTextNode(course.name);       // Create a text node

        para.appendChild(t);                                          // Append the text to <p>
        para.classList.add(course.blocks_url)
        para.classList.add(count)
        document.getElementById('list_courses').appendChild(para);
        $('.'+count).click(function(eventObject) {
        console.log(this.classList[0])
        $.ajax({
            type: "GET",
            url: this.classList[0]+'&depth=1',
            success: updateChapters
        });

    });
        count++;
    }
        

    }
    function listAuthorCourses() {
        $.ajax({
            type: "GET",
            url: list_author_URL,
            success: updateCourses
        })
    }
    function updateChapters(result) {
    count = 0
    for(let block in result.blocks){

        if(result.blocks[block].type == "chapter"){
       
        
        var para = document.createElement("P");                       // Create a <p> element
        var t = document.createTextNode(result.blocks[block].display_name);       // Create a text node

        para.appendChild(t);                                          // Append the text to <p>
        para.classList.add(result.blocks[block].id)
        para.classList.add(count+'chapters')
        document.getElementById('list_chapters').appendChild(para);
        $('.'+count+'chapters').click(function(eventObject) {
        console.log(this.classList[0])
        $.ajax({
            type: "GET",
            url: '/api/courses/v1/blocks/'+this.classList[0]+'/?depth=1',
            success: updateSequentials
        });

    });
        count++;
    }
        

        
    }
}

    function updateSequentials(result) {

      count = 0
    for(let block in result.blocks){

        if(result.blocks[block].type == "sequential"){
       
        
        var para = document.createElement("P");                       // Create a <p> element
        var t = document.createTextNode(result.blocks[block].display_name);       // Create a text node

        para.appendChild(t);                                          // Append the text to <p>
        para.classList.add(result.blocks[block].id)
        para.classList.add(count+'sequential')
        document.getElementById('list_sequentials').appendChild(para);
        $('.'+count+'sequential').click(function(eventObject) {
        console.log(this.classList[0])
        $.ajax({
            type: "GET",
            url: '/api/courses/v1/blocks/'+this.classList[0]+'/?depth=1',
            success: updateVerticals
        });

    });
        count++;
    }
        

        
    }

    }

    function updateVerticals(result) {

            count = 0
    for(let block in result.blocks){

        if(result.blocks[block].type == "vertical"){
       
        
        var para = document.createElement("P");                       // Create a <p> element
        var t = document.createTextNode(result.blocks[block].display_name);       // Create a text node

        para.appendChild(t);                                          // Append the text to <p>
        para.classList.add(result.blocks[block].id)
        para.classList.add(count+'verticals')
        document.getElementById('list_verticals').appendChild(para);
        $('.'+count+'verticals').click(function(eventObject) {
        $('.edit-parent-locator').val(this.classList[0]); 

    });
        count++;
    }
        

        
    }


    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');

    
    $('.coursesbutton', element).click(function(eventObject) {
        $.ajax({
            type: "GET",
            url: list_author_URL,
            success: updateCourses
        });
    });

    $('.sharebutton').click(function(eventObject) {
        $('.edit-parent-locator').value
        $.ajax({
            type: "POST",
            url: "http://localhost:18010/xblock/",
            contentType: "application/json",
            data: JSON.stringify({
                username: $('.edit-user-name').val(),
                password: $('.edit-password').val(),
                duplicate_source_locator: $('.edit-duplicate-source-locator').val(),
                parent_locator: $('.edit-parent-locator').val(),
}),
            success: updateCourses
        });
    });
    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
