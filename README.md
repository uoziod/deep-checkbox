# Deep Checkbox
### jQuery plugin that brings some logic to nested checkboxes.

Imagine multidimensional list with checkboxes. They are nested in LI-elements (by the way, nesting is necessary for this plugin work).

Child-checkboxes are inherit parent's property. Is possible to uncheck automatically checked items — that will exceptions. Also you can set element to display human-readable list of checked and excepted checkboxes there.

**[You can see demo here](http://uoziod.github.io/deep-checkbox)**.

Plugin should be called to selector wrapping whole list:

    <div class="wrapper">
        <ul>
            <li>
                <input type="checkbox" data-id="item" data-name="Item" /> Item
                <ul>
                    <li><input type="checkbox" data-id="subitem1" data-name="Subitem 1" /> Subitem 1</li>
                    <li><input type="checkbox" data-id="subitem2" data-name="Subitem 2" /> Subitem 2</li>
                    <li><input type="checkbox" data-name="Subitem 3" /> Subitem 3</li>
                </ul>
            </li>
        </ul>
    </div>
    
    <script>
        $('.wrapper').deepcheckbox();
    </script>

Plugin can be called with following options:

    $('.wrapper').deepcheckbox({
        readableListTarget: '.selector', // Selector for element(s), where will be displayed readable text with checked items
        listItemBefore: '<span class="item">', // Prefix before each item in readable list
        listItemAfter: '</span>', // Suffix after each item in readable list
        listItemsDivider: ', ', // Divider between items in readable list
        labelExceptBefore: ' (except ', // Text before exceptions in readable list
        labelExceptAfter: ')', // Text after exceptions in readable list
        labelExceptBetween: ')', // Text between exceptions in readable list
        labelNothingIsSelected: ')', // Option for substitution of "Nothing is selected" text
        onChange: function (items, except) { // This function will be called when user is interacting with checkboxes
            console.log(items); // First parameter is list of checked items
            console.log(except); // Second parameter is list of exceptions
        }
    });

Plugin is using **data-id** and **data-name** attributes in checkboxes. They are not necessary; if not set — it would be generated.

**data-name** is value that will display in readable list when corresponding checkbox is set positive (should be the same as text near checkbox). **data-id** is what will be passed as array item into callback function **onChange**.