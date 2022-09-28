class Api::V1::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    @task = Task.where(user_id: params[:id]).order(:schedule)
    render json: @task
  end

  def create
    if task_params[:schedule].to_datetime > Time.now
      @task = Task.create(task_params)

      if @task
        render json: {
          status: {
            code: 200,
            message: "Succesfully added new task!"
          }
        }
      else
        render json: {
          status: {
            message: 'Unprocessable content!'
          }
        }
      end
    else
      render json: {
        status: {
          message: 'Invalid date! (Date should not be less than ' + Time.now.to_s
        }
      }
    end
  end

  def edit
    @task = Task.find(params[:id])
    render json: @task
  end

  def update
    if task_params[:schedule].to_datetime > Time.now
      Task.update(params[:id], :name => task_update_params[:name], :description => task_update_params[:description], :schedule => task_update_params[:schedule], :is_finished => task_update_params[:is_finished])
    else
      render json: {
        status: {
          message: 'Invalid date! (Date should not be less than ' + Time.now.to_s
        }
      }
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :schedule, :user_id)
  end

  def task_update_params
    params.require(:task).permit(:name, :description, :schedule, :is_finished)
  end
end
