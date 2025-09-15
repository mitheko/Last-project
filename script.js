document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle=document.querySelectorAll('.dropdown-toggle');

    dropdownToggle.forEach(toggle=>{
        toggle.addEventListener('click',function(event){
            event.preventDefault();

            const parentNavItem=this.closest('.nav-item.dropdown');

            parentNavItem.classList.toggle('active');

            dropdownToggle.forEach(otherToggle=>{
                const otherParentNavItem=otherToggle.closest('.nav-item.dropdown');
                if(otherParentNavItem!==parentNavItem && otherParentNavItem.classList.contains('active')){
                    otherParentNavItem.classList.remove('active');
                }   
            });
        });
    });
    document.addEventListener('click',function(event){
        if(!event.target.closest('.navbar')){
            document.querySelectorAll('.nav-item.dropdown.active').forEach(activeDropdown=>{
                activeDropdown.classList.remove('active');
            });
        }
    });
 }); 

// Allow only one collapsible box to be open at a time
document.querySelectorAll('.collapse-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Close all other boxes
        document.querySelectorAll('.collapse-content').forEach(content => {
            if (content !== this.nextElementSibling) {
                content.style.display = 'none';
                if (content.previousElementSibling && content.previousElementSibling.classList.contains('collapse-btn')) {
                    content.previousElementSibling.textContent = 'Show content';
                }
            }
        });
        // Toggle current box
        toggleContent(this);
    });
});
function toggleContent(button) {
    const contentDiv = button.nextElementSibling;
    if (!contentDiv.style.display || contentDiv.style.display === "none") {
        contentDiv.style.display = "block";
        button.textContent = 'Hide content';
    } else {
        contentDiv.style.display = "none";
        button.textContent = "Show content";
    }
}
 