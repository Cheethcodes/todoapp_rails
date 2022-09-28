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

  private

  def task_params
    params.require(:task).permit(:name, :description, :schedule, :user_id)
  end
end
