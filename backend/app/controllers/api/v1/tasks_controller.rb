class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!

  def show
    task = Task.find(params[:id])
    render json: task
  end

  def create
    task = Task.new(task_params)

    if task.save
      render json: task
    else
      render json: {
        message: task.errors,
        status: :unprocessable_entity
      }
    end
  end

  def update
    if task_params[:schedule].to_datetime > Time.now
      Task.update(params[:id], :name => task_params[:name], :description => task_params[:description], :schedule => task_params[:schedule], :is_finished => task_params[:is_finished])
    else
      render json: {
        status: :unprocessable_entity,
        message: 'Invalid date! (Date should not be less than ' + Time.now.to_s
      }
    end
  end
  
  def destroy
    Task.delete(params[:id])
  end

  private
    def task_params
      params.require(:task).permit(:name, :description, :schedule, :is_finished, :user_id)
    end
end
