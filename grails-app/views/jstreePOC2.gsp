<html>
    <head>
        <title>Use jsTree</title>
        <script src="${request.contextPath}/js/jstree-v.pre1.0/_lib/jquery.js">
        </script>
        <script src="${request.contextPath}/js/jstree-v.pre1.0/jquery.jstree.js">
        </script>
        <script>
            $(document).ready(function(){
                $("#treeViewDiv").jstree({
                    "json_data" : {
                        "data":[
                            {
                                "data" : "Search engines",
                                "children" :[
                                             {"data":"Yahoo", "metadata":{"href":"http://www.yahoo.com"}},
                                             {"data":"Bing", "metadata":{"href":"http://www.bing.com"}},
                                             {"data":"Google", "children":[{"data":"Youtube", "metadata":{"href":"http://youtube.com"}},{"data":"Gmail", "metadata":{"href":"http://www.gmail.com"}},{"data":"Orkut","metadata":{"href":"http://www.orkut.com"}}], "metadata" : {"href":"http://youtube.com"}}
                                            ]
                            },
                            {
                                "data" : "Networking sites",
                                "children" :[
                                    {"data":"Facebook", "metadata":{"href":"http://www.fb.com"}},
                                    {"data":"Twitter", "metadata":{"href":"http://twitter.com"}}
                                ]
                            }
                        ]
                    },
                    "plugins" : [ "themes", "json_data", "ui" ]
                }).bind("select_node.jstree", function(e, data)
                    {
                        if(jQuery.data(data.rslt.obj[0], "href"))
                        {
                            window.location=jQuery.data(data.rslt.obj[0], "href");
                        }
                        else
                        {
                            alert("No href defined for this element");
                        }
                    })
            });
        </script>
    </head>
    <body>
        <div id="treeViewDiv">
        </div>
    </body>
</html>