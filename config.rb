require 'slim'

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy '/this-page-has-no-template.html', '/template-file.html', locals: {
#  which_fake_page: 'Rendering a fake page with a local variable' }

###
# Helpers
###

activate :directory_indexes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     'Helping'
#   end
# end

helpers do
  def nav_active(path)
    current_page.path.start_with?(path) ? 'text-primary' : ""
  end
end

# activate Sprockets to compile js
activate :sprockets

page '/404.html', directory_index: false

# Use relative URLs
activate :relative_assets
set :relative_links, true

# deployment
activate :deploy do |deploy|
  deploy.deploy_method = :git
  deploy.build_before = true
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end
