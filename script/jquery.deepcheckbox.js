/**
 * Deep Checkbox
 * A lightweight jQuery plugin for building complex nested checkbox trees,
 * complete with its own set of child-parent inheritance logic.
 * version 0.1.1
 *
 * Copyright (c) Semyon Vyskubov
 * https://github.com/uoziod/deep-checkbox
 *
 * Licensed under the MIT
 */

(function ($) {
	var defaults = {
			listItemBefore:         '<span class="item">',
			listItemAfter:          '</span>',
			listItemsDivider:       ', ',
			labelExceptBefore:      ' (except ',
			labelExceptAfter:       ')',
			labelExceptBetween:     ', ',
			labelNothingIsSelected: 'Nothing is selected'
		},
		instances = [];

	$.fn.deepcheckbox = function (options) {
		if (instances.indexOf(this.selector) < 0) {
			var tree = _buildTree(this);
			_bindCheckboxes(tree, function (item, value) {
				if (item.children) {
					_setValueToChildren(item.children, value);
				}
			});

			if (!options) {
				options = {};
			}

			options = $.extend(defaults, options);

			if (options.readableListTarget) {
				$(options.readableListTarget).html(options.labelNothingIsSelected);

				_bindCheckboxes(tree, function () {
					var items = [],
						except = [],
						output = [];

					function _dig(branch, level, skipAdding) {
						if (!level) {
							level = 0;
						}

						for (var i = 0, len = branch.length; i < len; i++) {
							if (branch[i].el.prop('checked')) {
								var value = options.listItemBefore.replace('{{id}}', branch[i].el.data('id')) + branch[i].el.data('name'),
									exceptCount = 0;

								if (branch[i].children) {
									for (var j = 0, lenJ = branch[i].children.length; j < lenJ; j++) {
										if (!branch[i].children[j].el.prop('checked')) {
											except.push(branch[i].children[j].el.data('id'));
											if (exceptCount === 0) {
												value += options.labelExceptBefore;
											}
											if (exceptCount > 0) {
												value += options.labelExceptBetween;
											}
											value += branch[i].children[j].el.data('name');
											exceptCount++;
										}
									}
									if (exceptCount > 0) {
										value += options.labelExceptAfter;
									}
								}

								value += options.listItemAfter;

								if (level > 0 && branch[i].el.prop('checked') && !branch[i].parent.prop('checked')) {
									skipAdding = false;
								}

								if (!skipAdding || exceptCount > 0) {
									output.push(value);
									items.push(branch[i].el.data('id'));
								}
							}

							if (branch[i].children) {
								_dig(branch[i].children, level + 1, true);
							}
						}
						return output.join(options.listItemsDivider);
					}

					var digged = _dig(tree);
					$(options.readableListTarget).html((digged.length > 0) ? digged : options.labelNothingIsSelected);

					if (options.onChange && typeof options.onChange === 'function') {
						options.onChange(items, except);
					}
				});
			}

			instances.push(this.selector);
		}
	};

	function _buildTree($anchor, $parent) {
		var output = [],
			rootItems = $anchor.find('ul:first > li');

		for (var i = 0, len = rootItems.length; i < len; i++) {
			var $element = $(rootItems[i]).find('input[type=checkbox]:first'),
				id = _guId();

			if (!$element.data('id')) {
				$element.data('id', id);
			}

			if (!$element.data('name')) {
				$element.data('name', id);
			}

			var branch = {
					el: $element
				},
				children = _buildTree($(rootItems[i]), $element);

			if (children) {
				branch.children = children;
			}

			if ($parent) {
				branch.parent = $parent;
			}

			output.push(branch);
		}

		return output.length > 0 ? output : false;
	}

	function _bindCheckboxes(tree, callback) {
		for (var i = 0, len = tree.length; i < len; i++) {
			(function (item) {
				$(item.el).on('change', function () {
					callback(item, $(this).prop('checked'));
				});

				if (item.children) {
					_bindCheckboxes(item.children, callback);
				}
			}(tree[i]));
		}
	}

	function _setValueToChildren(tree, value) {
		for (var i = 0, len = tree.length; i < len; i++) {
			tree[i].el.prop('checked', value);
			if (tree[i].children) {
				_setValueToChildren(tree[i].children, value);
			}
		}
	}

	function _guId() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}

		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}
})(jQuery);