Vue.directive('drag-drop', {
    bind: function(el, binding) {

        this.draggedElement = {
            element: null,
            group: null
        };

        this.droppedElement = null;

        // Set elements to draggable
        el.setAttribute('draggable', 'true');

        // Start
        el.addEventListener('dragstart', function (event) {

            var draggedStart = binding.value.dragStart;

            // Remove recent dragged element's drag end class since we're starting a new drag start instance
            if (this.draggedElement.element != null && this.draggedElement.element.getAttribute('class').indexOf(this.draggedElement.element.getAttribute('class')) > -1 ) {
                this.draggedElement.element.classList.remove(
                    typeof(binding.value.dragEnd) === 'object' ? binding.value.dragEnd.css : 'drag-end'
                );
            }

            // Remove drop element's drop class since we're starting a new drag start instance
            if (this.droppedElement != null) {
                this.droppedElement.classList.remove(
                    typeof(binding.value.drop) === 'object' ? binding.value.drop.css : 'drop'
                );
            }

            // We'll store the dragged element to validate our dropped element and in groupings
            this.draggedElement.element = event.target;
            this.draggedElement.group   = binding.value.group;

            event.target.classList.add(
                typeof(draggedStart) === 'object' ? draggedStart.css : 'drag-start'
            );

            // Drag and drop stuff
            event.dataTransfer.effectAllowed = 'move';
            event.dataTransfer.setData('text', '*');
            event.dataTransfer.setDragImage(el, -99999, -99999);

            if (typeof(draggedStart) === 'function') {
                binding.value.dragStart.call(this, event.target, event);
            } else if (typeof(draggedStart) === 'object' && typeof(draggedStart.method) === 'function') {
                binding.value.dragStart.method.call(this, event.target, event);
            }
        }.bind(this));

        // Moving
        el.addEventListener('drag', function (event) {

            var drag = binding.value.drag;

            event.target.classList.add(
                typeof(drag) === 'object' ? drag.css : 'drag'
            );

            if (typeof(drag) === 'function') {
                binding.value.drag.call(this, event.target, event);
            } else if (typeof(drag) === 'object' && typeof(drag.method) === 'function') {
                binding.value.drag.method.call(this, event.target, event);
            }
        }.bind(this));

        // Enter
        el.addEventListener('dragenter', function(event) {

            var dragEnter = binding.value.dragEnter;

            // Check if both elements are in the same group
            if (this.draggedElement.group != binding.value.group) {
                return false;
            }

            event.target.classList.add(
                typeof(dragEnter) === 'object' ? dragEnter.css : 'drag-enter'
            );

            if (typeof(dragEnter) === 'function') {
                binding.value.dragEnter.call(this, event.target, event);
            } else if (typeof(dragEnter) === 'object' && typeof(dragEnter.method) === 'function') {
                binding.value.dragEnter.method.call(this, event.target, event);
            }
        }.bind(this));

        // Enter-Over
        el.addEventListener('dragover', function(event) {

            // Do some magic to make drag and drop work
            event.preventDefault();

            var dragOver = binding.value.dragOver;

            // Check if both elements are in the same group
            if (this.draggedElement.group != binding.value.group) {
                return false;
            }

            event.target.classList.add(
                typeof(dragOver) === 'object' ? dragOver.css : 'drag-over'
            );

            if (typeof(dragOver) === 'function') {
                binding.value.dragOver.call(this, event.target, event);
            } else if (typeof(dragOver) === 'object' && typeof(dragOver.method) === 'function') {
                binding.value.dragOver.method.call(this, event.target, event);
            }
        }.bind(this));

        // Leave
        el.addEventListener('dragleave', function(event) {

            var dragLeave = binding.value.dragLeave;

            // Drag leave event's default css doesn't generate once initiated
            // Just in case user's needed to add class, put em, we don't want to make them sad!
            if (typeof(dragLeave) === 'object' && dragLeave.css != '') {
                event.target.classList.add(dragLeave.css);
            }

            // Obviously we'll remove dragEnter and dragOver's classes once they leave the element
            event.target.classList.remove(
                typeof(binding.value.dragEnter) === 'object' ? binding.value.dragEnter.css : 'drag-enter',
                typeof(binding.value.dragOver) === 'object' ? binding.value.dragOver.css : 'drag-over'
            );

            if (typeof(dragLeave) === 'function') {
                binding.value.dragLeave.call(this, event.target, event);
            } else if (typeof(dragLeave) === 'object' && typeof(dragLeave.method) === 'function') {
                binding.value.dragLeave.method.call(this, event.target, event);
            }
        }.bind(this));

        // Drop
        el.addEventListener('drop', function(event) {

            event.stopPropagation();

            var drop = binding.value.drop;

            // Drop event's default css doesn't generate once initiated
            // Just in case user's needed to add class, put em, we don't want to make them sad!
            if (typeof(drop) === 'object' && drop.css != '') {

                event.target.classList.add(drop.css);

                // We'll store the dropped element to remove the class once a new element is dragged
                // It may have other use in the future, so we'll put em here.
                this.droppedElement = event.target;
            }

            // Obviously we'll remove all event classes once they dropped the element
            // Except for drop event, since we put some effort to put it just in case the user
            // wants to add a class for it, don't make em worse!
            event.target.classList.remove(
                typeof(binding.value.dragEnter) === 'object' ? binding.value.dragEnter.css : 'drag-enter',
                typeof(binding.value.dragOver) === 'object' ? binding.value.dragOver.css : 'drag-over'
            );

            // Check if both elements are in the same group
            if (this.draggedElement.group != binding.value.group) {
                return false;
            }

            // Drop only the element if both dragged and target is different
            if (this.draggedElement.element != event.target) {

                if (typeof(drop) === 'function') {
                    binding.value.drop.call(this, this.draggedElement.element, event.target);
                } else if (typeof(drop) === 'object' && typeof(drop.method) === 'function') {
                    binding.value.drop.method.call(this, this.draggedElement.element, event.target);
                }
            }
        }.bind(this));

        // End of Drag
        el.addEventListener('dragend', function(event) {

            var dragEnd = binding.value.dragEnd;

            // Drag end event's default css doesn't generate once initiated
            // Just in case user's needed to add class, put em, we don't want to make them sad!
            if (typeof(dragEnd) === 'object' && dragEnd.css != '') {
                event.target.classList.add(dragEnd.css);
            }

            // Obviously we'll remove all event classes once they dropped the element
            // Except for drop event, since we put some effort to put it just in case the user
            // wants to add a class for it, don't make em worse!
            event.target.classList.remove(
                typeof(binding.value.dragStart) === 'object' ? binding.value.dragStart.css : 'drag-start',
                typeof(binding.value.drag) === 'object' ? binding.value.drag.css : 'drag'
            );

            if (typeof(dragEnd) === 'function') {
                binding.value.dragEnd.call(this, event.target, event);
            } else if (typeof(dragEnd) === 'object' && typeof(dragEnd.method) === 'function') {
                binding.value.dragEnd.method.call(this, event.target, event);
            }
        }.bind(this));
    }
});