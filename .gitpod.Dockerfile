FROM gitpod/workspace-full:latest
RUN bash -c "source ~/.nvm/nvm.sh && nvm install 17 ; nvm use 17 ; nvm alias default 17"
RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvmfix