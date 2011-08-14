/*
 * Focusify jQuery Plugin v1.0
 * http://www.andrewleeart.com/wp/?p=84
 *
 * Copyright (c) 2011 Andrew A. Lee
 *
 * Dual licensed under the MIT and GPL licenses, located in
 * MIT-LICENSE.txt and GPL-LICENSE.txt respectively.
 *
 * Date: Sat Aug 13 2011 20:24:34 GMT-0500
 */

(function($){
$.fn.focusify = function(args){
	var methods = {
		ns: 'focusify',
		
		st: {
			classname: 'infocus',
			parent: null,
			sibling: null
		},
		
		handleFocusBlur: function(){
			var $this = $(this),
				_this = methods,
				$el;
			
			if(_this.st.sibling && _this.st.parent){
				$el = $this.siblings(_this.st.sibling)
						.add($this.parents(_this.st.parent));
			}else if(_this.st.sibling){
				$el = $this.siblings(_this.st.sibling);
			}else if(_this.st.parent){
				$el = $this.parents(_this.st.parent);
			}else{
				$el = $this.prev();
			}
			
			$el.toggleClass(_this.st.classname);
		},
		
		init: function(opts){
			var _this = methods;
			
			$.extend(_this.st, opts || {});
			
			this.each(function(){
				if(!$.data(this, _this.ns)){
					$(this).bind('focus.' + _this.ns + ' blur.' + _this.ns, _this.handleFocusBlur);
					$.data(this, _this.ns, true);
				}
			});
		},
		
		destroy: function(){
			var _this = methods;
			
			this.each(function(){
				$(this).unbind('.' + _this.ns);
				$.removeData(this, _this.ns);
			});
		}
	};

	if(arguments.length && args === 'destroy'){
		methods.destroy.call(this);
	}else{
		methods.init.call(this, args);
	}
	
	return this;
};
})(jQuery);