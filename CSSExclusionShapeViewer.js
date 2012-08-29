/*
 * Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window */

define(function (require, exports, module) {
    'use strict';
    
    // Load Brackets modules
    var InlineWidget        = brackets.getModule("editor/InlineWidget").InlineWidget;
    
    // Load tempalte
    var inlineEditorTemplate = require("text!CSSExclusionShapeViewer.html");
    
    function CSSExclusionShapeViewer(shape, width, height) {
        this.shape = shape;
        this.width = width;
        this.height = height;
        InlineWidget.call(this);
    }
    CSSExclusionShapeViewer.prototype = new InlineWidget();
    CSSExclusionShapeViewer.prototype.constructor = CSSExclusionShapeViewer;
    CSSExclusionShapeViewer.prototype.parentClass = InlineWidget.prototype;
    
    CSSExclusionShapeViewer.prototype.shape = null;
    CSSExclusionShapeViewer.prototype.width = 200;
    CSSExclusionShapeViewer.prototype.height = 200;
    CSSExclusionShapeViewer.prototype.$wrapperDiv = null;
    
    CSSExclusionShapeViewer.prototype.load = function (hostEditor) {
        this.parentClass.load.call(this, hostEditor);
        
        this.$wrapperDiv = $(inlineEditorTemplate);
        
        var svg = $(this.$wrapperDiv.find("#shape"));
        svg.css("width", this.width + "px");
        svg.css("height", this.height + "px");
        svg.append(this.shape);
        
        this.$htmlContent.append(this.$wrapperDiv);
    };

    CSSExclusionShapeViewer.prototype.close = function () {
        this.hostEditor.removeInlineWidget(this);
    };
    
    CSSExclusionShapeViewer.prototype.onAdded = function () {
        window.setTimeout(this._sizeEditorToContent.bind(this));
    };
    
    CSSExclusionShapeViewer.prototype._sizeEditorToContent = function () {
        this.hostEditor.setInlineWidgetHeight(this, this.$wrapperDiv.height() + this.height * 0.2 + 20, true);
    };
    
    module.exports = CSSExclusionShapeViewer;
});
